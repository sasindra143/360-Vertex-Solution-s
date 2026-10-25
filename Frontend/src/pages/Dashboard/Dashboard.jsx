import { useNavigate } from "react";
import { useAuth } from "../../context/AuthContext";
import { InitialsAvatar } from "../../components/Profile/ImageCropModal";
import {
  User, FolderGit2, MessageSquare, BookOpen, GraduationCap,
  Bell, HelpCircle, Settings as SettingsIcon, LogOut, Shield, ChevronRight
} from "lucide-react";
import "../Technology/WebDevelopment/webdev-shared.css";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const DASHBOARD_CARDS = [
    {
      id: "profile",
      title: "My Profile",
      desc: "Manage your personal information, bio, company, and avatar.",
      icon: <User size={24} style={{ color: "#00c6ff" }} />,
      action: () => navigate("/profile"),
      tag: "Account",
    },
    {
      id: "projects",
      title: "My Projects",
      desc: "Track active web development, custom code, and software builds.",
      icon: <FolderGit2 size={24} style={{ color: "#f59e0b" }} />,
      action: () => navigate("/client-work"),
      tag: "Development",
    },
    {
      id: "enquiries",
      title: "My Enquiries",
      desc: "View submitted project quotes, marketing inquiries, and service requests.",
      icon: <MessageSquare size={24} style={{ color: "#10b981" }} />,
      action: () => navigate("/contact"),
      tag: "Services",
    },
    {
      id: "courses",
      title: "My Courses",
      desc: "Access enrolled tech programs, full-stack workshops, and study materials.",
      icon: <BookOpen size={24} style={{ color: "#6366f1" }} />,
      action: () => navigate("/academy"),
      tag: "Academy",
    },
    {
      id: "certificates",
      title: "My Certificates",
      desc: "Download verified course completion badges and skill certificates.",
      icon: <GraduationCap size={24} style={{ color: "#ec4899" }} />,
      action: () => navigate("/academy"),
      tag: "Credentials",
    },
    {
      id: "settings",
      title: "Settings & Security",
      desc: "Update password, view active sessions, and configure notifications.",
      icon: <SettingsIcon size={24} style={{ color: "#06b6d4" }} />,
      action: () => navigate("/settings"),
      tag: "Security",
    },
    {
      id: "notifications",
      title: "Notifications",
      desc: "System alerts, course updates, and project progress logs.",
      icon: <Bell size={24} style={{ color: "#8b5cf6" }} />,
      action: () => navigate("/settings?tab=notifications"),
      tag: "Alerts",
    },
    {
      id: "support",
      title: "Support & Help",
      desc: "Connect directly with our 24/7 technical team via WhatsApp or email.",
      icon: <HelpCircle size={24} style={{ color: "#25d366" }} />,
      action: () => navigate("/contact"),
      tag: "24/7 Help",
    },
  ];

  return (
    <div className="dash-page">
      <div className="wd-ct">
        {/* WELCOME BANNER */}
        <div className="dash-banner">
          <div className="dash-banner__user">
            <div className="dash-banner__avatar">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt={user.full_name} className="dash-avatar-img" />
              ) : (
                <InitialsAvatar name={user.full_name} size={64} />
              )}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h1 className="dash-banner__name">Welcome, {user.full_name}</h1>
                <span className={`dash-role-badge dash-role-badge--${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
                {user.email_verified ? (
                  <span className="dash-verified-tag">✓ Email Verified</span>
                ) : (
                  <span className="dash-unverified-tag">⚠ Email Not Verified</span>
                )}
              </div>
              <p className="dash-banner__email">{user.email}</p>
            </div>
          </div>

          <div className="dash-banner__actions">
            <button className="wd-btn wd-btn--outline" onClick={() => navigate("/settings")}>
              <SettingsIcon size={16} /> Settings
            </button>
            <button className="wd-btn wd-btn--ghost" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* DASHBOARD CARDS GRID */}
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Customer Dashboard Overview</h2>
            <p>Access all your digital services, learning modules, and project tools in one portal.</p>
          </div>

          <div className="dash-cards-grid">
            {DASHBOARD_CARDS.map((card) => (
              <div
                key={card.id}
                className="dash-card"
                onClick={card.action}
                role="button"
                tabIndex={0}
              >
                <div className="dash-card__top">
                  <div className="dash-card__icon">{card.icon}</div>
                  <span className="dash-card__tag">{card.tag}</span>
                </div>
                <h3 className="dash-card__title">{card.title}</h3>
                <p className="dash-card__desc">{card.desc}</p>
                <div className="dash-card__arrow">
                  <span>Open Module</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}

            {user.role === "ADMIN" && (
              <div
                className="dash-card dash-card--admin"
                onClick={() => navigate("/admin/customers")}
                role="button"
                tabIndex={0}
              >
                <div className="dash-card__top">
                  <div className="dash-card__icon"><Shield size={24} style={{ color: "#ef4444" }} /></div>
                  <span className="dash-card__tag" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>Admin</span>
                </div>
                <h3 className="dash-card__title">Customer Management</h3>
                <p className="dash-card__desc">Manage all registered accounts, user roles, suspension, and verification status.</p>
                <div className="dash-card__arrow" style={{ color: "#ef4444" }}>
                  <span>Manage Customers</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
