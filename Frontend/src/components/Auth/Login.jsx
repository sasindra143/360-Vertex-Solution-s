import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "./PasswordInput";
import { COMPANY } from "../../config";
import { ArrowLeft, Sparkles, Mail } from "lucide-react";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, resendVerificationEmail, isAuthenticated, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={user?.role === "ADMIN" ? "/admin/media-notes" : "/dashboard"} replace />;
  }

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setUnverifiedEmail("");
    setResendSuccess(false);

    try {
      const signedInUser = await login(form.email, form.password, form.rememberMe);
      navigate(signedInUser.role === "ADMIN" ? "/admin/media-notes" : "/dashboard");
    } catch (err) {
      if (err.code === "EMAIL_NOT_VERIFIED") {
        setUnverifiedEmail(err.email);
        setErrorMsg(err.message);
      } else if (err.code === "ADMIN_AUTH_UNAVAILABLE") {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!unverifiedEmail) return;
    try {
      resendVerificationEmail(unverifiedEmail);
      setResendSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orbs">
        <div className="auth-orb auth-orb--1" />
        <div className="auth-orb auth-orb--2" />
      </div>

      <div className="auth-split-card">
        {/* LEFT BRANDING */}
        <div className="auth-left-brand">
          <div className="auth-brand-logo" onClick={() => navigate("/")}>
            <img src={COMPANY.logo} alt="360° Vertex Solutions" />
            <div>
              <p className="auth-brand-name">360° Vertex</p>
              <p className="auth-brand-tag">{COMPANY.tagline}</p>
            </div>
          </div>

          <div className="auth-brand-hero">
            <h1 className="auth-brand-title">Welcome Back.</h1>
            <p className="auth-brand-sub">
              Sign in to access your custom dashboard, digital services, academy courses, and career projects.
            </p>
          </div>

          <div className="auth-brand-footer">
            <Sparkles size={14} style={{ color: "#00c6ff" }} />
            <span>Secure Enterprise Authentication Ecosystem</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-right-form">
          <button
            className="auth-back-button"
            type="button"
            onClick={() => navigate("/")}
            aria-label="Back to home"
            title="Back to home"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-sub">
              Sign in to continue to your 360° Vertex Solutions account.
            </p>
          </div>

          {errorMsg && (
            <div className="auth-alert auth-alert--error">
              <span>⚠️</span>
              <div>
                <p style={{ margin: 0 }}>{errorMsg}</p>
                {unverifiedEmail && (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="auth-link"
                    style={{ marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <Mail size={13} /> Resend Verification Email
                  </button>
                )}
              </div>
            </div>
          )}

          {resendSuccess && (
            <div className="auth-alert auth-alert--success">
              <span>✅</span>
              <span>Verification email sent! Please check your inbox.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field-group">
              <label className="auth-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="auth-input"
              />
            </div>

            <PasswordInput
              label="Password *"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              showStrength={false}
            />

            <div className="auth-row-actions">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="auth-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="wd-btn wd-btn--primary"
              style={{ width: "100%", marginTop: "10px" }}
            >
              {loading ? "Signing in..." : "Login →"}
            </button>
          </form>

          <div className="auth-footer-nav">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
