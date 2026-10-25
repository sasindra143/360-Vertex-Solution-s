import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ImageCropModal, { InitialsAvatar } from "./ImageCropModal";
import { User, Mail, Phone, Building, Briefcase, MapPin, Edit3, Shield, LogOut, Upload, Trash2, CheckCircle, X } from "lucide-react";
import "../../pages/Technology/WebDevelopment/webdev-shared.css";
import "../../pages/Dashboard/Dashboard.css";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfileData, logout } = useAuth();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Crop Modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImgSrc, setSelectedImgSrc] = useState(null);

  // Form state
  const [editForm, setEditForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    company: user?.company || "",
    job_role: user?.job_role || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  if (!user) return null;

  const showNotification = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size < 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload a valid JPG, PNG, or WebP image under 5 MB.");
      return;
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid JPG, PNG, or WebP image under 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImgSrc(reader.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBase64) => {
    updateProfileData({ profile_image_url: croppedBase64 });
    setCropModalOpen(false);
    showNotification("Profile image updated successfully.");
  };

  const handleRemoveAvatar = () => {
    updateProfileData({ profile_image_url: "" });
    showNotification("Profile image removed.");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfileData({
      full_name: editForm.full_name,
      phone: editForm.phone,
      company: editForm.company,
      job_role: editForm.job_role,
      location: editForm.location,
      bio: editForm.bio,
    });
    setIsEditing(false);
    showNotification("Profile updated successfully.");
  };

  return (
    <div className="profile-page">
      <div className="wd-ct">
        {/* NON-BLOCKING SUCCESS TOAST */}
        {successToast && (
          <div className="profile-toast">
            <CheckCircle size={18} style={{ color: "#10b981" }} />
            <span>{successToast}</span>
          </div>
        )}

        <div className="profile-header">
          <div>
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-sub">Manage your personal information, profile photo, and account details.</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="wd-btn wd-btn--outline" onClick={() => navigate("/settings")}>
              <Shield size={16} /> Security Settings
            </button>
            <button className="wd-btn wd-btn--ghost" onClick={() => { logout(); navigate("/"); }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* PROFILE CARD SPLIT */}
        <div className="profile-card">
          {/* LEFT: AVATAR COLUMN */}
          <div className="profile-avatar-col">
            <div className="profile-avatar-wrapper">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt={user.full_name} className="profile-avatar-img" />
              ) : (
                <InitialsAvatar name={user.full_name} size={130} />
              )}
            </div>

            <div className="profile-avatar-name">{user.full_name}</div>
            <div className="profile-avatar-role">{user.job_role || user.role}</div>

            <div className="profile-status-badge">
              {user.email_verified ? (
                <span className="dash-verified-tag">✓ Email Verified</span>
              ) : (
                <span className="dash-unverified-tag">⚠ Email Not Verified</span>
              )}
            </div>

            {/* AVATAR ACTIONS */}
            <div className="profile-avatar-btns">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileSelect}
              />
              <button
                className="wd-btn wd-btn--outline"
                style={{ fontSize: "0.82rem", padding: "8px 14px", width: "100%" }}
                onClick={() => fileInputRef.current.click()}
              >
                <Upload size={14} /> {user.profile_image_url ? "Change Image" : "Upload Image"}
              </button>

              {user.profile_image_url && (
                <button
                  className="wd-btn wd-btn--ghost"
                  style={{ fontSize: "0.82rem", padding: "8px 14px", width: "100%", color: "#ef4444" }}
                  onClick={handleRemoveAvatar}
                >
                  <Trash2 size={14} /> Remove Image
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: INFORMATION COLUMN */}
          <div className="profile-info-col">
            <div className="profile-info-header">
              <h3>Personal Information</h3>
              {!isEditing && (
                <button className="wd-btn wd-btn--primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }} onClick={() => setIsEditing(true)}>
                  <Edit3 size={15} /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="profile-edit-form">
                <div className="profile-form-grid">
                  <div className="wd-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      className="wd-form-input"
                      value={editForm.full_name}
                      onChange={e => setEditForm({ ...editForm, full_name: e.target.value })}
                    />
                  </div>

                  <div className="wd-form-group">
                    <label>Email Address (Immutable)</label>
                    <input type="email" readOnly value={user.email} className="wd-form-input" style={{ opacity: 0.6, cursor: "not-allowed" }} />
                  </div>

                  <div className="wd-form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="wd-form-input"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="wd-form-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      className="wd-form-input"
                      value={editForm.company}
                      onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                    />
                  </div>

                  <div className="wd-form-group">
                    <label>Job Role / Title</label>
                    <input
                      type="text"
                      className="wd-form-input"
                      value={editForm.job_role}
                      onChange={e => setEditForm({ ...editForm, job_role: e.target.value })}
                    />
                  </div>

                  <div className="wd-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="wd-form-input"
                      value={editForm.location}
                      onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                    />
                  </div>

                  <div className="wd-form-group wd-form-group--full">
                    <label>Bio / About</label>
                    <textarea
                      rows={3}
                      className="wd-form-textarea"
                      value={editForm.bio}
                      onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="profile-edit-actions">
                  <button type="button" className="wd-btn wd-btn--ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="wd-btn wd-btn--primary">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details-grid">
                <div className="profile-detail-item">
                  <span className="profile-detail-label"><User size={15} /> Full Name</span>
                  <span className="profile-detail-val">{user.full_name}</span>
                </div>

                <div className="profile-detail-item">
                  <span className="profile-detail-label"><Mail size={15} /> Email Address</span>
                  <span className="profile-detail-val">{user.email}</span>
                </div>

                <div className="profile-detail-item">
                  <span className="profile-detail-label"><Phone size={15} /> Phone</span>
                  <span className="profile-detail-val">{user.phone || "Not specified"}</span>
                </div>

                <div className="profile-detail-item">
                  <span className="profile-detail-label"><Building size={15} /> Company / Organization</span>
                  <span className="profile-detail-val">{user.company || "Not specified"}</span>
                </div>

                <div className="profile-detail-item">
                  <span className="profile-detail-label"><Briefcase size={15} /> Job Role</span>
                  <span className="profile-detail-val">{user.job_role || "Not specified"}</span>
                </div>

                <div className="profile-detail-item">
                  <span className="profile-detail-label"><MapPin size={15} /> Location</span>
                  <span className="profile-detail-val">{user.location || "Not specified"}</span>
                </div>

                <div className="profile-detail-item profile-detail-item--full">
                  <span className="profile-detail-label">Bio / About</span>
                  <span className="profile-detail-val">{user.bio || "No bio added yet."}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CROP MODAL */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={selectedImgSrc}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}
