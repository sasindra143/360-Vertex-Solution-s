import { createContext, useContext, useState, useEffect, useRef } from "react";
import { ADMIN_EMAIL } from "./authConstants";
import { apiUrl } from "../utils/api";

const AuthContext = createContext(null);

// Keep only a customer demo account in the client-side demo login.
const INITIAL_USERS = [
  {
    id: "user-2",
    uuid: "22222222-3333-4444-5555-666666666666",
    full_name: "Alex Johnson",
    email: "customer@example.com",
    password_hash: "Customer@2026",
    phone: "+1 555 019 2834",
    company: "Apex Innovations",
    job_role: "Product Manager",
    location: "San Francisco, CA",
    bio: "Building digital products and exploring modern AI integrations.",
    email_verified: true,
    status: "active",
    role: "CUSTOMER",
    profile_image_url: "",
    created_at: "2026-02-15T00:00:00Z",
    last_login_at: new Date().toISOString(),
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("vertex_all_users");
    const loadedUsers = saved ? JSON.parse(saved) : INITIAL_USERS;
    return loadedUsers.filter((user) => user.role !== "ADMIN");
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("vertexLoggedInUser");
    const user = saved ? JSON.parse(saved) : null;
    return user?.role === "ADMIN" ? null : user;
  });

  const [adminSession, setAdminSession] = useState(null);
  const [adminSessionStatus, setAdminSessionStatus] = useState("checking");
  const adminSessionRequestId = useRef(0);

  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem("vertex_reset_tokens");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("vertex_all_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("vertexLoggedInUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("vertexLoggedInUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("vertex_reset_tokens", JSON.stringify(tokens));
  }, [tokens]);

  useEffect(() => {
    let active = true;
    const requestId = adminSessionRequestId.current;
    fetch(apiUrl("/api/admin/auth/session"), { credentials: "include" })
      .then(async (response) => {
        if (!active || requestId !== adminSessionRequestId.current) return;
        if (response.status === 401) {
          setAdminSession(null);
          setAdminSessionStatus("anonymous");
          return;
        }
        if (!response.ok) {
          throw new Error(`Admin session check failed (${response.status}).`);
        }

        const result = await response.json();
        if (!active || requestId !== adminSessionRequestId.current) return;
        if (result.user?.email?.toLowerCase() !== ADMIN_EMAIL || result.user?.role !== "ADMIN") {
          throw new Error("The admin authentication service returned an invalid session.");
        }
        setAdminSession(result.user);
        setAdminSessionStatus("authenticated");
      })
      .catch(() => {
        if (active && requestId === adminSessionRequestId.current) {
          setAdminSession(null);
          setAdminSessionStatus("unavailable");
        }
      });

    return () => { active = false; };
  }, []);

  // Signup
  const signup = async ({ full_name, email, password, phone, profile_image_url }) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    let registrationResponse;
    try {
      registrationResponse = await fetch(apiUrl("/api/registrations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, phone: phone || "" }),
      });
    } catch {
      throw new Error("Registration is unavailable right now. Please try again later.");
    }
    const registrationResult = await registrationResponse.json().catch(() => ({}));
    if (!registrationResponse.ok) {
      throw new Error(registrationResult.message || "Could not save your registration.");
    }

    const newUser = {
      id: `user-${Date.now()}`,
      uuid: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-uuid`,
      full_name,
      email: email.toLowerCase(),
      password_hash: password, // In production, hashed on server
      phone: phone || "",
      company: "",
      job_role: "Customer",
      location: "",
      bio: "",
      email_verified: false,
      status: "active",
      role: "CUSTOMER",
      profile_image_url: profile_image_url || "",
      created_at: new Date().toISOString(),
      last_login_at: "",
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("vertex_registration_prompt_completed", "true");

    // Create email verification token
    const verifyToken = `verify-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setTokens(prev => ({ ...prev, [verifyToken]: { email: newUser.email, type: "verify", expires: Date.now() + 86400000 } }));

    return { user: newUser, verifyToken };
  };

  // Login
  const login = async (email, password, rememberMe = false) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL) {
      adminSessionRequestId.current += 1;
      let response;
      try {
        response = await fetch(apiUrl("/api/admin/auth/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
      } catch {
        const error = new Error("Admin sign-in is unavailable. Start the authentication server and try again.");
        error.code = "ADMIN_AUTH_UNAVAILABLE";
        throw error;
      }

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(result.message || "Admin sign-in failed.");
        error.code = response.status === 401 ? "INVALID_CREDENTIALS" : "ADMIN_AUTH_UNAVAILABLE";
        throw error;
      }

      if (result.user?.email?.toLowerCase() !== ADMIN_EMAIL || result.user?.role !== "ADMIN") {
        throw new Error("The admin authentication service returned an invalid account.");
      }
      setAdminSession(result.user);
      setAdminSessionStatus("authenticated");
      return result.user;
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password_hash !== password) {
      throw new Error("Invalid email or password.");
    }

    if (user.status === "suspended") {
      throw new Error("Your account has been suspended. Please contact support.");
    }

    if (!user.email_verified) {
      const error = new Error("Please verify your email before signing in.");
      error.code = "EMAIL_NOT_VERIFIED";
      error.email = user.email;
      throw error;
    }

    const updatedUser = { ...user, last_login_at: new Date().toISOString() };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    setCurrentUser(updatedUser);

    if (rememberMe) {
      localStorage.setItem("vertex_remember_me", "true");
    }

    return updatedUser;
  };

  // Logout
  const logout = () => {
    adminSessionRequestId.current += 1;
    if (adminSession) {
      fetch(apiUrl("/api/admin/auth/logout"), {
        method: "POST",
        credentials: "include",
      }).then((response) => {
        if (!response.ok) throw new Error(`Admin logout failed (${response.status}).`);
      }).catch((error) => {
        console.error("Could not clear the server-side admin session.", error);
      });
    }
    setAdminSession(null);
    setAdminSessionStatus("anonymous");
    setCurrentUser(null);
    localStorage.removeItem("vertex_remember_me");
  };

  // Verify Email
  const verifyEmailToken = (token) => {
    const tokenData = tokens[token];
    if (!tokenData || tokenData.type !== "verify" || tokenData.expires < Date.now()) {
      throw new Error("This verification link has expired or is invalid. Please request a new one.");
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === tokenData.email.toLowerCase()) {
        return { ...u, email_verified: true };
      }
      return u;
    });

    setUsers(updatedUsers);
    if (currentUser && currentUser.email.toLowerCase() === tokenData.email.toLowerCase()) {
      setCurrentUser({ ...currentUser, email_verified: true });
    }

    // Invalidate token
    const newTokens = { ...tokens };
    delete newTokens[token];
    setTokens(newTokens);
    return true;
  };

  // Resend Verification Email
  const resendVerificationEmail = (email) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("User not found.");
    if (user.email_verified) throw new Error("Email is already verified.");

    const verifyToken = `verify-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setTokens(prev => ({ ...prev, [verifyToken]: { email: user.email, type: "verify", expires: Date.now() + 86400000 } }));
    return verifyToken;
  };

  // Forgot Password
  const forgotPassword = (email) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    // Security: Do not reveal if email exists, but return token if found for local simulation
    if (user) {
      const resetToken = `reset-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setTokens(prev => ({ ...prev, [resetToken]: { email: user.email, type: "reset", expires: Date.now() + 3600000 } }));
      return resetToken;
    }
    return null;
  };

  // Reset Password
  const resetPasswordToken = (token, newPassword) => {
    const tokenData = tokens[token];
    if (!tokenData || tokenData.type !== "reset" || tokenData.expires < Date.now()) {
      throw new Error("This password reset link has expired. Please request a new one.");
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === tokenData.email.toLowerCase()) {
        return { ...u, password_hash: newPassword };
      }
      return u;
    });

    setUsers(updatedUsers);

    // Invalidate token
    const newTokens = { ...tokens };
    delete newTokens[token];
    setTokens(newTokens);
    return true;
  };

  // Update Profile
  const updateProfileData = (profileData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Change Password
  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) throw new Error("Not logged in");
    if (currentUser.password_hash !== currentPassword) {
      throw new Error("Current password is incorrect.");
    }
    if (currentPassword === newPassword) {
      throw new Error("New password cannot be the same as current password.");
    }

    const updatedUser = { ...currentUser, password_hash: newPassword };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Admin User Actions
  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
  };

  return (
    <AuthContext.Provider
      value={{
        user: adminSession || currentUser,
        isAuthenticated: !!adminSession || !!currentUser,
        isAdmin: !!adminSession && adminSession.email?.toLowerCase() === ADMIN_EMAIL,
        adminSessionStatus,
        users,
        signup,
        login,
        logout,
        verifyEmailToken,
        resendVerificationEmail,
        forgotPassword,
        resetPasswordToken,
        updateProfileData,
        changePassword,
        toggleUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
