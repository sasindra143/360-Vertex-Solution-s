import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ADMIN_EMAIL } from "../../context/authConstants";
import { InitialsAvatar } from "../../components/Profile/ImageCropModal";
import { Shield, UserCheck, UserX, Search, Mail, RefreshCw } from "lucide-react";
import "../Technology/WebDevelopment/webdev-shared.css";
import "../Dashboard/Dashboard.css";
import "../../components/Profile/Profile.css";
import { apiUrl } from "../../utils/api";

export default function AdminCustomers() {
  const { user, users, toggleUserStatus, resendVerificationEmail } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  const [registrationsError, setRegistrationsError] = useState("");

  useEffect(() => {
    if (user?.role !== "ADMIN" || user.email?.toLowerCase() !== ADMIN_EMAIL) return undefined;

    let active = true;
    fetch(apiUrl("/api/admin/registrations"), { credentials: "include" })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || "Could not load website registrations.");
        if (active) setRegistrations(result.registrations || []);
      })
      .catch((error) => {
        if (active) setRegistrationsError(error.message);
      })
      .finally(() => {
        if (active) setRegistrationsLoading(false);
      });

    return () => { active = false; };
  }, [user?.email, user?.role]);

  if (!user || user.role !== "ADMIN" || user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <div className="dash-page" style={{ textAlign: "center", paddingTop: "140px" }}>
        <h2>Access Denied</h2>
        <p>You must have ADMIN permissions to view customer database management.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(u =>
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRegistrations = registrations.filter((registration) =>
    registration.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    || registration.email.toLowerCase().includes(searchTerm.toLowerCase())
    || registration.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResend = (email) => {
    try {
      resendVerificationEmail(email);
      setActionMsg(`Verification email resent to ${email}`);
      setTimeout(() => setActionMsg(""), 4000);
    } catch (err) {
      setActionMsg(err.message);
      setTimeout(() => setActionMsg(""), 4000);
    }
  };

  return (
    <div className="dash-page">
      <div className="wd-ct">
        {actionMsg && (
          <div className="profile-toast">
            <span>ℹ️ {actionMsg}</span>
          </div>
        )}

        <section className="dash-banner" style={{ display: "block", padding: "24px", marginBottom: "24px", overflowX: "auto" }}>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ margin: 0, color: "#fff" }}>Website Registrations</h2>
            <p className="profile-sub" style={{ margin: "6px 0 0" }}>
              Signups submitted from the welcome form and account registration. Passwords are never stored in this list.
            </p>
          </div>
          {registrationsError && <p role="alert" style={{ color: "#fca5a5" }}>{registrationsError}</p>}
          {registrationsLoading ? (
            <p role="status" style={{ color: "#94a3b8" }}>Loading website registrations…</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "620px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <th style={{ padding: "12px 16px" }}>Name</th>
                  <th style={{ padding: "12px 16px" }}>Email</th>
                  <th style={{ padding: "12px 16px" }}>Phone</th>
                  <th style={{ padding: "12px 16px" }}>Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "14px 16px", color: "#f8fafc", fontWeight: 650 }}>{registration.full_name}</td>
                    <td style={{ padding: "14px 16px", color: "#cbd5e1" }}>{registration.email}</td>
                    <td style={{ padding: "14px 16px", color: "#cbd5e1" }}>{registration.phone || "—"}</td>
                    <td style={{ padding: "14px 16px", color: "#94a3b8" }}>
                      {registration.created_at ? new Date(registration.created_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
                {!filteredRegistrations.length && (
                  <tr>
                    <td colSpan="4" style={{ padding: "18px 16px", color: "#94a3b8", textAlign: "center" }}>
                      {registrations.length ? "No registrations match your search." : "No website registrations have been submitted yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>

        <div className="profile-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={28} style={{ color: "#ef4444" }} />
              <h1 className="profile-title" style={{ margin: 0 }}>Customer Database Management</h1>
            </div>
            <p className="profile-sub" style={{ marginTop: "6px" }}>
              View customer accounts, verify emails, manage roles, and activate/suspend access.
            </p>
          </div>

          <div style={{ position: "relative", width: "300px" }}>
            <input
              type="text"
              placeholder="Search customers..."
              className="wd-form-input"
              style={{ width: "100%", paddingLeft: "40px" }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          </div>
        </div>

        {/* CUSTOMERS TABLE CARD */}
        <div className="dash-banner" style={{ display: "block", padding: "24px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                <th style={{ padding: "12px 16px" }}>Customer</th>
                <th style={{ padding: "12px 16px" }}>Role</th>
                <th style={{ padding: "12px 16px" }}>Email Status</th>
                <th style={{ padding: "12px 16px" }}>Account Status</th>
                <th style={{ padding: "12px 16px" }}>Created</th>
                <th style={{ padding: "12px 16px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.92rem" }}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      {u.profile_image_url ? (
                        <img src={u.profile_image_url} alt={u.full_name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                      ) : (
                        <InitialsAvatar name={u.full_name} size={40} />
                      )}
                      <div>
                        <p style={{ margin: 0, fontWeight: "700", color: "#ffffff" }}>{u.full_name}</p>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span className={`dash-role-badge dash-role-badge--${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    {u.email_verified ? (
                      <span className="dash-verified-tag">✓ Verified</span>
                    ) : (
                      <span className="dash-unverified-tag">⚠ Unverified</span>
                    )}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      background: u.status === "active" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                      color: u.status === "active" ? "#10b981" : "#ef4444"
                    }}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "#64748b", fontSize: "0.85rem" }}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {!u.email_verified && (
                        <button
                          className="wd-btn wd-btn--ghost"
                          style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                          title="Resend Verification Email"
                          onClick={() => handleResend(u.email)}
                        >
                          <RefreshCw size={13} />
                        </button>
                      )}
                      {u.role !== "ADMIN" && (
                        <button
                          className="wd-btn wd-btn--ghost"
                          style={{ padding: "6px 12px", fontSize: "0.78rem", color: u.status === "active" ? "#ef4444" : "#10b981" }}
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u.status === "active" ? <UserX size={14} /> : <UserCheck size={14} />}
                          {u.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
