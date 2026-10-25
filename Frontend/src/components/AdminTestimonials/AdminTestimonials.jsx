import { useState } from "react";
import "./AdminTestimonials.css";

function AdminTestimonials() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    salary: "",
    quote: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing =
      JSON.parse(localStorage.getItem("testimonials")) || [];

    existing.push(form);
    localStorage.setItem("testimonials", JSON.stringify(existing));

    alert("Testimonial added successfully");
    setForm({ name: "", role: "", salary: "", quote: "" });
  };

  return (
    <section className="admin-testimonials">
      <h2>Admin – Add Testimonial</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
        <input name="role" placeholder="Role" onChange={handleChange} value={form.role} required />
        <input name="salary" placeholder="Package (e.g. 6.5 LPA)" onChange={handleChange} value={form.salary} required />
        <textarea name="quote" placeholder="Testimonial text" onChange={handleChange} value={form.quote} required />
        <button type="submit">Add Testimonial</button>
      </form>
    </section>
  );
}

export default AdminTestimonials;
