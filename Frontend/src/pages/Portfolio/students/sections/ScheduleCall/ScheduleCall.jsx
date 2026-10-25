import { useState } from "react";
import RegisterForm from "./RegisterForm";
import "./ScheduleCall.css";

export default function ScheduleCall() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) return <RegisterForm />;

  return (
    <section className="schedule">
      <div className="schedule-left">
        <h2>Portfolio Discovery Call</h2>
        <p>30 mins • Free Consultation</p>

        <ul>
          <li>Your career goals</li>
          <li>Portfolio structure</li>
          <li>Design preferences</li>
          <li>Next steps</li>
        </ul>
      </div>

      <div className="schedule-right">
        <h3>Select time</h3>

        <div className="time-grid">
          {["01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"].map((t) => (
            <button key={t}>{t}</button>
          ))}
        </div>

        <button
          className="continue-btn"
          onClick={() => setShowRegister(true)}
        >
          Continue →
        </button>
      </div>
    </section>
  );
}
