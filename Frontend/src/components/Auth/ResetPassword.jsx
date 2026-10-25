import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput, { evaluatePassword } from "./PasswordInput";
import { CheckCircle, AlertTriangle } from "lucide-react";
import "./Auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPasswordToken } = useAuth();

  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.newPassword || form.newPassword.length < 8) {
      errs.newPassword = "Password must contain at least 8 characters.";
    } else {
      const evalRes = evaluatePassword(form.newPassword);
      if (!evalRes.isValid) {
        errs.newPassword = "Password does not meet strength requirements.";
      }
    }

    if (form.newPassword !== form.confirmNewPassword) {
      errs.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      resetPasswordToken(token, form.newPassword);
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || "Invalid or expired password reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orbs">
        <div className="auth-orb auth-orb--1" />
        <div className="auth-orb auth-orb--2" />
      </div>

      <div className="auth-split-card" style={{ maxWidth: "520px", gridTemplateColumns: "1fr" }}>
        <div className="auth-right-form" style={{ padding: "44px 36px" }}>
          
          {success ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ margin: "0 auto 16px", width: "56px", height: "56px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={32} style={{ color: "#10b981" }} />
              </div>
              <h2 className="auth-form-title">Password Reset!</h2>
              <p className="auth-form-sub" style={{ marginBottom: "24px" }}>
                Your password has been updated successfully.
              </p>
              <button className="wd-btn wd-btn--primary" style={{ width: "100%" }} onClick={() => navigate("/login")}>
                Login Now →
              </button>
            </div>
          ) : (
            <>
              <div className="auth-form-header">
                <h2 className="auth-form-title">Create a New Password</h2>
                <p className="auth-form-sub">
                  Enter your new password below. It must contain at least 8 characters.
                </p>
              </div>

              {errorMsg && (
                <div className="auth-alert auth-alert--error">
                  <AlertTriangle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <PasswordInput
                  label="New Password *"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Min 8 characters (e.g. Vertex@2026)"
                  required
                  showStrength={true}
                  error={errors.newPassword}
                />

                <PasswordInput
                  label="Confirm New Password *"
                  name="confirmNewPassword"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  required
                  showStrength={false}
                  error={errors.confirmNewPassword}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="wd-btn wd-btn--primary"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  {loading ? "Resetting Password..." : "Reset Password →"}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
