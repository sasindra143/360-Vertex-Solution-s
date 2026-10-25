import { useState } from "react";
import "./WebDevAdmin.css";

const STORAGE_KEY = "clientWorkProjects";

export default function WebDevAdmin() {
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

  const [form, setForm] = useState({
    title: "",
    description1: "",
    description2: "",
    description3: "",
    clientName: "",
    clientImage: "",
    clientReview: "",
    rating: "5.0",
    website: "",
    instagram: "",
    media: "",
  });

  /* LOAD FROM LOCAL STORAGE */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ADD PROJECT */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title: form.title,
      description: [
        form.description1,
        form.description2,
        form.description3,
      ],
      client: {
        name: form.clientName,
        image: form.clientImage,
        reviewText: form.clientReview,
      },
      rating: form.rating,
      website: form.website,
      instagram: form.instagram,
      media: form.media.split(",").map((src) => ({
        type: src.trim().endsWith(".mp4") ? "video" : "image",
        src: src.trim(),
      })),
    };

    const updated = [newProject, ...projects];

    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event("projectsUpdated"));

    setForm({
      title: "",
      description1: "",
      description2: "",
      description3: "",
      clientName: "",
      clientImage: "",
      clientReview: "",
      rating: "5.0",
      website: "",
      instagram: "",
      media: "",
    });
  };

  /* DELETE PROJECT */
  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  return (
    <section className="webdev-admin">
      <h1>Web Development – Admin Panel</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Project Title" required onChange={handleChange} />
        <input name="description1" placeholder="Description line 1" required onChange={handleChange} />
        <input name="description2" placeholder="Description line 2" required onChange={handleChange} />
        <input name="description3" placeholder="Description line 3" required onChange={handleChange} />
        <input name="clientName" placeholder="Client Name" required onChange={handleChange} />
        <input name="clientImage" placeholder="Client Image URL" required onChange={handleChange} />
        <textarea name="clientReview" placeholder="Client Review" required onChange={handleChange} />
        <input name="rating" placeholder="Rating" onChange={handleChange} />
        <input name="website" placeholder="Live Website URL" onChange={handleChange} />
        <input name="instagram" placeholder="Instagram URL" onChange={handleChange} />
        <textarea name="media" placeholder="Media URLs (comma separated)" required onChange={handleChange} />
        <button type="submit">Add Client Project</button>
      </form>

      <div className="admin-list">
        {projects.map((p) => (
          <div key={p.id} className="admin-card">
            <strong>{p.title}</strong>
            <span>{p.client.name}</span>
            <button onClick={() => deleteProject(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}
