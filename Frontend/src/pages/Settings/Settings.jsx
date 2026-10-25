import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/Auth/PasswordInput";
import { User, Shield, Bell, Lock, CheckCircle, AlertTriangle, LogOut, Laptop, Smartphone } from "lucide-react";
import "../Technology/WebDevelopment/webdev-shared.css";
import "../Dashboard/Dashboard.css";
import "../../components/Profile/Profile.css";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, updateProfileData, changePassword, logout } = useAuth();

  // Toast
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  // Change Password Form
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [pwdError, setPwdError] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    company: user?.company || "",
    job_role: user?.job_role || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  // Notification Toggles
  const [notifs, setNotifs] = useState({
    emailNotifs: true,
    marketingNotifs: false,
    courseNotifs: true,
    projectNotifs: true,
  });

  // Privacy Toggles
  const [privacy, setPrivacy] = useState({
    accountVisibility: "private",
    shareActivity: true,
  });

  if (!user) return null;

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfileData(profileForm);
    showToast("Profile settings saved successfully.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPwdError("");

    if (pwdForm.newPassword !== pwdForm.confirmNewPassword) {
      setPwdError("Passwords do not match.");
      return;
    }

    setPwdLoading(true);
    try {
      changePassword(pwdForm.currentPassword, pwdForm.newPassword);
      showToast("Your password has been changed successfully.");
      setPwdForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setPwdError(err.message || "Failed to change password.");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="wd-ct">
        {toast && (
          <div className="profile-toast">
            <CheckCircle size={18} style={{ color: "#10b981" }} />
            <span>{toast}</span>
          </div>
        )}

        <div className="profile-header">
          <div>
            <h1 className="profile-title">Account Settings</h1>
            <p className="profile-sub">Manage your security preferences, profile details, and notification rules.</p>
          </div>
        </div>

        {/* SETTINGS CARD WITH TABS */}
        <div className="settings-card">
          {/* TAB SIDEBAR */}
          <div className="settings-sidebar">
            <button
              className={`settings-tab-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={18} /> Profile Details
            </button>
            <button
              className={`settings-tab-btn ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <Shield size={18} /> Security & Passwords
            </button>
            <button
              className={`settings-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell size={18} /> Notifications
            </button>
            <button
              className={`settings-tab-btn ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              <Lock size={18} /> Privacy & Data
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="settings-content">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div>
                <h3 className="settings-section-title">Profile Information</h3>
                <form onSubmit={handleProfileSave} className="profile-edit-form">
                  <div className="profile-form-grid">
                    <div className="wd-form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        className="wd-form-input"
                        value={profileForm.full_name}
                        onChange={e => setProfileForm({ ...profileForm, full_name: e.target.value })}
                      />
                    </div>
                    <div className="wd-form-group">
                      <label>Email Address</label>
                      <input type="email" readOnly value={user.email} className="wd-form-input" style={{ opacity: 0.6 }} />
                    </div>
                    <div className="wd-form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        className="wd-form-input"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="wd-form-group">
                      <label>Company / Organization</label>
                      <input
                        type="text"
                        className="wd-form-input"
                        value={profileForm.company}
                        onChange={e => setProfileForm({ ...profileForm, company: e.target.value })}
                      />
                    </div>
                    <div className="wd-form-group">
                      <label>Job Role</label>
                      <input
                        type="text"
                        className="wd-form-input"
                        value={profileForm.job_role}
                        onChange={e => setProfileForm({ ...profileForm, job_role: e.target.value })}
                      />
                    </div>
                    <div className="wd-form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        className="wd-form-input"
                        value={profileForm.location}
                        onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                      />
                    </div>
                    <div className="wd-form-group wd-form-group--full">
                      <label>Bio</label>
                      <textarea
                        rows={3}
                        className="wd-form-textarea"
                        value={profileForm.bio}
                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="wd-btn wd-btn--primary">
                      Save Profile Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div>
                <h3 className="settings-section-title">Change Password</h3>

                {pwdError && (
                  <div className="auth-alert auth-alert--error" style={{ marginBottom: "20px" }}>
                    <AlertTriangle size={18} />
                    <span>{pwdError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="auth-form" style={{ maxWidth: "480px" }}>
                  <PasswordInput
                    label="Current Password *"
                    name="currentPassword"
                    value={pwdForm.currentPassword}
                    onChange={e => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                    required
                    showStrength={false}
                  />

                  <PasswordInput
                    label="New Password *"
                    name="newPassword"
                    value={pwdForm.newPassword}
                    onChange={e => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                    required
                    showStrength={true}
                  />

                  <PasswordInput
                    label="Confirm New Password *"
                    name="confirmNewPassword"
                    value={pwdForm.confirmNewPassword}
                    onChange={e => setPwdForm({ ...pwdForm, confirmNewPassword: e.target.value })}
                    required
                    showStrength={false}
                  />

                  <button type="submit" disabled={pwdLoading} className="wd-btn wd-btn--primary" style={{ marginTop: "12px" }}>
                    {pwdLoading ? "Updating..." : "Change Password"}
                  </button>
                </form>

                <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "40px 0" }} />

                <h3 className="settings-section-title">Email Verification Status</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
                  {user.email_verified ? (
                    <span className="dash-verified-tag" style={{ fontSize: "0.9rem", padding: "6px 14px" }}>✓ Email Verified</span>
                  ) : (
                    <span className="dash-unverified-tag" style={{ fontSize: "0.9rem", padding: "6px 14px" }}>⚠ Email Not Verified</span>
                  )}
                  <span style={{ fontSize: "0.88rem", color: "#94a3b8" }}>{user.email}</span>
                </div>

                <h3 className="settings-section-title">Active Sessions</h3>
                <div className="settings-session-list">
                  <div className="settings-session-item">
                    <Laptop size={22} style={{ color: "#00c6ff" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: "700" }}>Current Windows Device</p>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Active now • Hyderabad, India</p>
                    </div>
                    <span className="dash-verified-tag">This Device</span>
                  </div>

                  <div className="settings-session-item">
                    <Smartphone size={22} style={{ color: "#94a3b8" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: "700" }}>Mobile App Session</p>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>2 hours ago • Hyderabad, India</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button className="wd-btn wd-btn--outline" onClick={() => showToast("Logged out from all other active sessions.")}>
                    Log Out All Other Sessions
                  </button>
                  <button className="wd-btn wd-btn--ghost" style={{ color: "#ef4444" }} onClick={() => { logout(); navigate("/"); }}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div>
                <h3 className="settings-section-title">Notification Preferences</h3>
                <div className="settings-toggle-list">
                  <label className="settings-toggle-row">
                    <div>
                      <p className="settings-toggle-title">Email Notifications</p>
                      <p className="settings-toggle-sub">Receive account security and system update emails.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.emailNotifs}
                      onChange={e => setNotifs({ ...notifs, emailNotifs: e.target.checked })}
                    />
                  </label>

                  <label className="settings-toggle-row">
                    <div>
                      <p className="settings-toggle-title">Course & Academy Alerts</p>
                      <p className="settings-toggle-sub">Get notified about new courses, live workshops, and certificates.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.courseNotifs}
                      onChange={e => setNotifs({ ...notifs, courseNotifs: e.target.checked })}
                    />
                  </label>

                  <label className="settings-toggle-row">
                    <div>
                      <p className="settings-toggle-title">Project Development Logs</p>
                      <p className="settings-toggle-sub">Receive progress notifications on web & custom code builds.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.projectNotifs}
                      onChange={e => setNotifs({ ...notifs, projectNotifs: e.target.checked })}
                    />
                  </label>

                  <label className="settings-toggle-row">
                    <div>
                      <p className="settings-toggle-title">Marketing & Offers</p>
                      <p className="settings-toggle-sub">Receive news regarding promotions, discounts, and tech insights.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.marketingNotifs}
                      onChange={e => setNotifs({ ...notifs, marketingNotifs: e.target.checked })}
                    />
                  </label>
                </div>

                <button className="wd-btn wd-btn--primary" style={{ marginTop: "24px" }} onClick={() => showToast("Notification preferences updated.")}>
                  Save Preferences
                </button>
              </div>
            )}

            {/* PRIVACY TAB */}
            {activeTab === "privacy" && (
              <div>
                <h3 className="settings-section-title">Privacy & Account Visibility</h3>
                <div className="wd-form-group" style={{ maxWidth: "400px", marginBottom: "24px" }}>
                  <label>Profile Visibility</label>
                  <select
                    className="wd-form-select"
                    value={privacy.accountVisibility}
                    onChange={e => setPrivacy({ ...privacy, accountVisibility: e.target.value })}
                  >
                    <option value="private">Private (Only visible to you and Admins)</option>
                    <option value="public">Public (Visible to community members)</option>
                  </select>
                </div>

                <label className="settings-toggle-row" style={{ maxWidth: "540px" }}>
                  <div>
                    <p className="settings-toggle-title">Share Activity in Student Directory</p>
                    <p className="settings-toggle-sub">Allow recruiters to discover your completed portfolio projects.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.shareActivity}
                    onChange={e => setPrivacy({ ...privacy, shareActivity: e.target.checked })}
                  />
                </label>

                <button className="wd-btn wd-btn--primary" style={{ marginTop: "24px" }} onClick={() => showToast("Privacy settings saved.")}>
                  Save Privacy Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
