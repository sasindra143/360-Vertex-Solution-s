import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput, { evaluatePassword } from "./PasswordInput";
import { COMPANY } from "../../config";
import { Sparkles, Mail, CheckCircle, ArrowRight } from "lucide-react";
import "./Auth.css";

export default function Signup({ isModal = false, onClose, onComplete }) {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profile_image_url: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated && !isModal) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isModal, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setErrorMsg("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.full_name || form.full_name.trim().length < 2) {
      newErrors.full_name = "Full name must be at least 2 characters.";
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password || form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else {
      const evalRes = evaluatePassword(form.password);
      if (!evalRes.isValid) {
        newErrors.password = "Password must meet strength requirements.";
      }
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      await signup({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        profile_image_url: form.profile_image_url,
      });
      setRegisteredEmail(form.email);
      setSuccessState(true);
      onComplete?.();
    } catch (err) {
      setErrorMsg(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-page${isModal ? " registration-prompt" : ""}`} role={isModal ? "dialog" : undefined} aria-modal={isModal || undefined} aria-labelledby={isModal ? "registration-title" : undefined}>
      {isModal && (
        <button type="button" className="registration-prompt__close" onClick={onClose} aria-label="Close registration form">
          ×
        </button>
      )}
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
            <h1 className="auth-brand-title">Build Your Future With Us.</h1>
            <p className="auth-brand-sub">
              Join thousands of professionals, students, and businesses scaling digital products, learning tech, and driving organic growth.
            </p>
          </div>

          <div className="auth-brand-footer">
            <Sparkles size={14} style={{ color: "#00c6ff" }} />
            <span>Secure Enterprise Authentication Ecosystem</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-right-form">
          {successState ? (
            <div className="auth-success-state" style={{ textAlign: "center" }}>
              <div style={{ margin: "0 auto 16px", width: "56px", height: "56px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={32} style={{ color: "#10b981" }} />
              </div>
              <h2 className="auth-form-title">Account Created!</h2>
              <p className="auth-form-sub" style={{ marginBottom: "24px" }}>
                Your account for <strong>{registeredEmail}</strong> has been created. Please check your email inbox to verify your account before logging in.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button
                  className="wd-btn wd-btn--primary"
                  onClick={() => navigate(`/verify-email?email=${encodeURIComponent(registeredEmail)}`)}
                >
                  <Mail size={16} /> Check Email Verification
                </button>
                <Link to="/login" className="auth-link">
                  Continue to Login →
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="auth-form-header">
                <h2 id={isModal ? "registration-title" : undefined} className="auth-form-title">Create Your Account</h2>
                <p className="auth-form-sub">
                  Join 360° Vertex Solutions and access your learning, career and digital services.
                </p>
              </div>

              {errorMsg && (
                <div className="auth-alert auth-alert--error">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field-group">
                  <label className="auth-label">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="e.g. Sasindra Madduri"
                    required
                    className={`auth-input ${errors.full_name ? "auth-input--error" : ""}`}
                  />
                  {errors.full_name && <span className="auth-error-msg">{errors.full_name}</span>}
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className={`auth-input ${errors.email ? "auth-input--error" : ""}`}
                  />
                  {errors.email && <span className="auth-error-msg">{errors.email}</span>}
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9959732476"
                    className="auth-input"
                  />
                </div>

                <PasswordInput
                  label="Password *"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters (e.g. Vertex@2026)"
                  required
                  showStrength={true}
                  error={errors.password}
                />

                <PasswordInput
                  label="Confirm Password *"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  showStrength={false}
                  error={errors.confirmPassword}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="wd-btn wd-btn--primary"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  {loading ? "Creating Account..." : "Create Account →"}
                </button>
              </form>

              <div className="auth-footer-nav">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
