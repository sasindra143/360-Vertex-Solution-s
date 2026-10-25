import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

export function evaluatePassword(password = "") {
  const reqs = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const score = reqs.filter(r => r.met).length;

  let strength = "Weak";
  let color = "#ef4444";
  let percent = 20;

  if (score >= 5) {
    strength = "Strong";
    color = "#10b981";
    percent = 100;
  } else if (score >= 3) {
    strength = "Medium";
    color = "#f59e0b";
    percent = 60;
  } else if (score >= 1) {
    strength = "Weak";
    color = "#ef4444";
    percent = 30;
  }

  return { reqs, score, strength, color, percent, isValid: score >= 5 };
}

export default function PasswordInput({
  label = "Password",
  name = "password",
  value = "",
  onChange,
  placeholder = "••••••••",
  required = true,
  showStrength = false,
  error = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const evalResult = evaluatePassword(value);

  return (
    <div className="auth-field-group">
      {label && <label className="auth-label">{label} {required && "*"}</label>}
      <div className="auth-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`auth-input ${error ? "auth-input--error" : ""}`}
        />
        <button
          type="button"
          className="auth-eye-btn"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <span className="auth-error-msg">{error}</span>}

      {showStrength && value.length > 0 && (
        <div className="auth-strength-container">
          <div className="auth-strength-bar-bg">
            <div
              className="auth-strength-bar-fill"
              style={{ width: `${evalResult.percent}%`, backgroundColor: evalResult.color }}
            />
          </div>
          <div className="auth-strength-header">
            <span className="auth-strength-text">
              Strength: <strong style={{ color: evalResult.color }}>{evalResult.strength}</strong>
            </span>
          </div>

          <div className="auth-strength-reqs">
            {evalResult.reqs.map((req, i) => (
              <div key={i} className={`auth-req-item ${req.met ? "auth-req-item--met" : ""}`}>
                {req.met ? <Check size={13} className="auth-req-icon" /> : <X size={13} className="auth-req-icon" />}
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
