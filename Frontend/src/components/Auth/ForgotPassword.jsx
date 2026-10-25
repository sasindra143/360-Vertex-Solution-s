import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { COMPANY } from "../../config";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import "./Auth.css";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const token = forgotPassword(email);
    if (token) {
      setResetToken(token);
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orbs">
        <div className="auth-orb auth-orb--1" />
        <div className="auth-orb auth-orb--2" />
      </div>

      <div className="auth-split-card" style={{ maxWidth: "520px", gridTemplateColumns: "1fr" }}>
        <div className="auth-right-form" style={{ padding: "44px 36px" }}>
          
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ margin: "0 auto 16px", width: "56px", height: "56px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={32} style={{ color: "#10b981" }} />
              </div>
              <h2 className="auth-form-title">Instructions Sent</h2>
              <p className="auth-form-sub" style={{ marginBottom: "24px" }}>
                If an account exists for <strong>{email}</strong>, check your email for password reset instructions.
              </p>

              {/* Demo link for quick testing */}
              {resetToken && (
                <div className="auth-alert auth-alert--success" style={{ textAlign: "left", marginBottom: "20px", flexDirection: "column", alignItems: "flex-start" }}>
                  <p style={{ margin: 0, fontWeight: "700" }}>Demo Reset Link Generated:</p>
                  <Link to={`/reset-password/${resetToken}`} className="auth-link" style={{ wordBreak: "break-all" }}>
                    /reset-password/{resetToken} →
                  </Link>
                </div>
              )}

              <Link to="/login" className="wd-btn wd-btn--primary" style={{ width: "100%" }}>
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="auth-form-header">
                <h2 className="auth-form-title">Forgot Your Password?</h2>
                <p className="auth-form-sub">
                  Enter the email address associated with your account and we’ll send instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field-group">
                  <label className="auth-label">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="auth-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="wd-btn wd-btn--primary"
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  {loading ? "Sending..." : "Send Reset Link →"}
                </button>
              </form>

              <div className="auth-footer-nav">
                <Link to="/login" className="auth-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
