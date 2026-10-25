import { useState, useRef } from "react";
import { X, ZoomIn, ZoomOut, Check } from "lucide-react";
import "./ImageCropModal.css";

export function getInitials(name = "") {
  if (!name) return "VX";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function InitialsAvatar({ name = "", size = 48, className = "" }) {
  const initials = getInitials(name);
  const colors = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#ec4899", "#8b5cf6"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];

  return (
    <div
      className={`initials-avatar ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: `${size * 0.4}px`,
        userSelect: "none",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      {initials}
    </div>
  );
}

export default function ImageCropModal({ isOpen, imageSrc, onClose, onCropComplete }) {
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);

  if (!isOpen || !imageSrc) return null;

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    if (imgRef.current) {
      const img = imgRef.current;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, size, size);
      const croppedBase64 = canvas.toDataURL("image/webp", 0.9);
      onCropComplete(croppedBase64);
    }
  };

  return (
    <div className="crop-modal-overlay" onClick={onClose}>
      <div className="crop-modal" onClick={e => e.stopPropagation()}>
        <div className="crop-modal__header">
          <h3>Crop Profile Image (1:1 Ratio)</h3>
          <button className="crop-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="crop-modal__body">
          <div className="crop-preview-wrapper" style={{ transform: `scale(${zoom})` }}>
            <img ref={imgRef} src={imageSrc} alt="Crop preview" className="crop-preview-img" />
            <div className="crop-circular-overlay" />
          </div>
        </div>
        <div className="crop-modal__controls">
          <div className="crop-zoom-slider">
            <ZoomOut size={16} />
            <input
              type="range"
              min="0.8"
              max="2"
              step="0.1"
              value={zoom}
              onChange={e => setZoom(parseFloat(e.target.value))}
            />
            <ZoomIn size={16} />
          </div>
          <div className="crop-modal__actions">
            <button className="wd-btn wd-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="wd-btn wd-btn--primary" onClick={handleSave}>
              <Check size={16} /> Save Cropped Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
