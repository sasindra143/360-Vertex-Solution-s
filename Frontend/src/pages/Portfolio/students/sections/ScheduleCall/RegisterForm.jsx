import "./ScheduleCall.css";
import { waLink } from "../../../../../config";

export default function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const message = `
New Portfolio Call Registration

Name: ${data.get("name")}
LinkedIn: ${data.get("linkedin")}
WhatsApp: ${data.get("phone")}
Address: ${data.get("address")}
    `;

    const url = waLink(message);

    window.open(url, "_blank");
  };

  return (
    <section className="register">
      <h2>Complete Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required />
        <input name="linkedin" placeholder="LinkedIn Profile URL" required />
        <input name="phone" placeholder="WhatsApp Number" required />
        <textarea
          name="address"
          placeholder="Your Address"
          required
        ></textarea>

        <button type="submit">Register & Send →</button>
      </form>
    </section>
  );
}
