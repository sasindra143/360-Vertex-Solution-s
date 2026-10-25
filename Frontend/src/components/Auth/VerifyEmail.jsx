import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { COMPANY } from "../../config";
import { CheckCircle, Mail, AlertTriangle, ArrowRight } from "lucide-react";
import "./Auth.css";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email") || "";

  const { verifyEmailToken, resendVerificationEmail } = useAuth();
  const [status, setStatus] = useState(token ? "verifying" : "pending");
  const [message, setMessage] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        verifyEmailToken(token);
        setStatus("success");
        setMessage("Email verified successfully.");
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Invalid or expired verification link.");
      }
    }
  }, [token]);

  const handleResend = () => {
    if (!emailParam) return;
    try {
      const newToken = resendVerificationEmail(emailParam);
      setResendSuccess(true);
      setMessage(`A new verification link has been sent to ${emailParam}.`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orbs">
        <div className="auth-orb auth-orb--1" />
        <div className="auth-orb auth-orb--2" />
      </div>

      <div className="auth-split-card" style={{ maxWidth: "560px", gridTemplateColumns: "1fr" }}>
        <div className="auth-right-form" style={{ padding: "48px 40px", textAlign: "center" }}>
          
          {status === "success" && (
            <div>
              <div style={{ margin: "0 auto 20px", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={36} style={{ color: "#10b981" }} />
              </div>
              <h2 className="auth-form-title">Email Verified!</h2>
              <p className="auth-form-sub" style={{ marginBottom: "28px" }}>
                Your email has been verified successfully. You can now sign in to your 360° Vertex Solutions account.
              </p>
              <button className="wd-btn wd-btn--primary" style={{ width: "100%" }} onClick={() => navigate("/login")}>
                Continue to Login →
              </button>
            </div>
          )}

          {status === "pending" && (
            <div>
              <div style={{ margin: "0 auto 20px", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0, 198, 255, 0.15)", border: "1px solid #00c6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={36} style={{ color: "#00c6ff" }} />
              </div>
              <h2 className="auth-form-title">Verify Your Email</h2>
              <p className="auth-form-sub" style={{ marginBottom: "24px" }}>
                Your account has been created. Please check your email inbox to verify your account.
              </p>

              {resendSuccess && (
                <div className="auth-alert auth-alert--success" style={{ marginBottom: "20px" }}>
                  <span>✅</span>
                  <span>{message}</span>
                </div>
              )}

              {emailParam && (
                <button className="wd-btn wd-btn--outline" style={{ width: "100%", marginBottom: "16px" }} onClick={handleResend}>
                  Resend Verification Email
                </button>
              )}

              <Link to="/login" className="auth-link">
                Back to Login →
              </Link>
            </div>
          )}

          {status === "error" && (
            <div>
              <div style={{ margin: "0 auto 20px", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={36} style={{ color: "#ef4444" }} />
              </div>
              <h2 className="auth-form-title">Verification Failed</h2>
              <p className="auth-form-sub" style={{ marginBottom: "24px" }}>
                {message}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link to="/login" className="wd-btn wd-btn--primary">
                  Back to Login
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
