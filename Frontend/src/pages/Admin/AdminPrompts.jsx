import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Copy, Eye, FileImage, FileText, ImagePlus, Pencil, Plus, Search,
  Sparkles, Star, Trash2, Upload, X,
} from "lucide-react";
import {
  createAdminPromptCategory,
  deleteAdminPrompt,
  deleteAdminPromptCategory,
  duplicateAdminPrompt,
  getAdminPrompt,
  getAdminPromptCategories,
  getAdminPrompts,
  saveAdminPrompt,
  setAdminPromptStatus,
} from "../Prompts/promptsApi";
import { apiUrl } from "../../utils/api";
import "./AdminPrompts.css";

const PAGE_SIZE = 12;
const EMPTY_PROMPT = {
  title: "", description: "", promptText: "", categoryId: "", tagsText: "",
  aiTools: [], difficulty: "Beginner", externalExampleImageUrl: "",
  generateImage: false, status: "draft", featured: false,
};
const TOOLS = ["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Stable Diffusion", "Copilot", "Other"];

function promptFormData(prompt) {
  return {
    ...EMPTY_PROMPT,
    ...prompt,
    categoryId: prompt.category?.id || prompt.categoryId || "",
    tagsText: (prompt.tags || []).join(", "),
    aiTools: prompt.aiTools || [],
  };
}

function promptPayload(form, status = form.status) {
  return {
    title: form.title,
    description: form.description,
    promptText: form.promptText,
    categoryId: form.categoryId,
    tags: form.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
    aiTools: form.aiTools,
    difficulty: form.difficulty,
    externalExampleImageUrl: form.externalExampleImageUrl,
    generateImage: form.generateImage,
    status,
    featured: form.featured,
  };
}

function dateLabel(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function PromptAdminNav() {
  const location = useLocation();
  const active = location.pathname === "/admin/prompts/new" ? "new"
    : new URLSearchParams(location.search).get("view") || "all";
  const items = [
    ["all", "All Prompts", "/admin/prompts"],
    ["new", "Add New Prompt", "/admin/prompts/new"],
    ["categories", "Categories", "/admin/prompts?view=categories"],
    ["images", "Generated Images", "/admin/prompts?view=images"],
  ];
  return (
    <nav className="prompt-admin__nav" aria-label="AI prompts administration">
      {items.map(([key, label, to]) => (
        <Link key={key} to={to} className={active === key ? "is-active" : ""}><Sparkles size={16} />{label}</Link>
      ))}
    </nav>
  );
}

function PromptPreview({ prompt, onClose }) {
  if (!prompt) return null;
  const imageSource = (url) => url?.startsWith("/") ? apiUrl(url) : url;
  return (
    <div className="prompt-admin__modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="prompt-admin__preview" role="dialog" aria-modal="true" aria-labelledby="prompt-preview-title">
        <button type="button" className="prompt-admin__icon" onClick={onClose} aria-label="Close preview"><X size={19} /></button>
        <span className="prompt-admin__eyebrow">PROMPT PREVIEW · {prompt.promptId || "UNSAVED"}</span>
        {prompt.coverImage?.url && <img className="prompt-admin__preview-cover" src={imageSource(prompt.coverImage.url)} alt="" />}
        <h2 id="prompt-preview-title">{prompt.title || "Untitled prompt"}</h2>
        <p>{prompt.description || "Add a short description to preview it here."}</p>
        <div className="prompt-admin__chips"><span>{prompt.category?.name || prompt.categoryName || "No category"}</span><span>{prompt.difficulty || "Beginner"}</span></div>
        <pre>{prompt.promptText || "Full prompt text will appear here."}</pre>
        {(prompt.exampleImages || []).length > 0 && <div className="prompt-admin__preview-images">{prompt.exampleImages.map((image) => <img key={image.id} src={imageSource(image.url)} alt={image.name || "Example output"} />)}</div>}
        {prompt.externalExampleImageUrl && <div className="prompt-admin__preview-images"><img src={prompt.externalExampleImageUrl} alt="External example output" /></div>}
        {(prompt.videos || []).map((video) => <video className="prompt-admin__preview-video" key={video.id || video.url} src={imageSource(video.url)} controls preload="metadata" />)}
        {(prompt.documents || []).map((document) => <a className="prompt-admin__file-link" key={document.id || document.url} href={imageSource(document.url)} target="_blank" rel="noreferrer"><FileText size={16} />{document.name}</a>)}
      </section>
    </div>
  );
}

function CategoryManager({ categories, onChange, setError, setMessage }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const addCategory = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await createAdminPromptCategory(name);
      setName("");
      onChange();
      setMessage("Prompt category added.");
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };
  const removeCategory = async (category) => {
    if (!window.confirm(`Delete the "${category.name}" category?`)) return;
    setBusy(true);
    setError("");
    try {
      await deleteAdminPromptCategory(category.id);
      onChange();
      setMessage("Prompt category deleted.");
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="prompt-admin__panel">
      <h2>Manage prompt categories</h2>
      <form className="prompt-admin__category-form" onSubmit={addCategory}>
        <label>New category name<input required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="For example, Marketing" /></label>
        <button className="prompt-admin__button" disabled={busy}><Plus size={16} />Add category</button>
      </form>
      {categories.length === 0 ? <p className="prompt-admin__empty">No categories yet. Add one to start creating prompts.</p> : (
        <ul className="prompt-admin__category-list">
          {categories.map((category) => <li key={category.id}><span>{category.name}</span><code>{category.id}</code><button type="button" disabled={busy} className="prompt-admin__icon" aria-label={`Delete ${category.name}`} onClick={() => removeCategory(category)}><Trash2 size={16} /></button></li>)}
        </ul>
      )}
    </section>
  );
}

function GeneratedImages({ prompts }) {
  const images = prompts.flatMap((prompt) => [
    ...(prompt.coverImage ? [{ ...prompt.coverImage, title: prompt.title, promptId: prompt.promptId, kind: "Cover" }] : []),
    ...(prompt.exampleImages || []).map((image) => ({ ...image, title: prompt.title, promptId: prompt.promptId, kind: "Example output" })),
  ]);
  return (
    <section className="prompt-admin__panel">
      <h2>Prompt image library</h2>
      <p className="prompt-admin__muted">Uploaded cover and example images used with your prompts. Images here are admin-managed assets, not automatically generated.</p>
      {images.length ? <div className="prompt-admin__image-grid">{images.map((image) => <article key={`${image.promptId}-${image.id}`}><img src={apiUrl(image.url)} alt={image.title} /><strong>{image.title}</strong><span>{image.kind} · {image.promptId}</span></article>)}</div> : <p className="prompt-admin__empty"><FileImage />No prompt images have been uploaded yet.</p>}
    </section>
  );
}

export default function AdminPrompts() {
  const location = useLocation();
  const navigate = useNavigate();
  const view = new URLSearchParams(location.search).get("view") || "all";
  const [result, setResult] = useState({ items: [], page: 1, pages: 0, total: 0 });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ q: "", category: "", status: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(location.state?.message || "");
  const [preview, setPreview] = useState(null);

  const loadCategories = async () => setCategories(await getAdminPromptCategories());
  useEffect(() => {
    let active = true;
    getAdminPromptCategories().then((items) => { if (active) setCategories(items); }).catch((loadError) => { if (active) setError(loadError.message); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (view === "new") return undefined;
    let active = true;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const data = await getAdminPrompts({ ...filters, page, limit: view === "images" ? 50 : PAGE_SIZE });
        if (active) { setResult(data); setError(""); }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    }, filters.q ? 250 : 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [filters, page, view]);

  const setFilter = (key, value) => { setPage(1); setFilters((current) => ({ ...current, [key]: value })); };
  const setStatus = async (prompt) => {
    setBusy(true); setError(""); setMessage("");
    try {
      await setAdminPromptStatus(prompt.promptId, prompt.status === "published" ? "draft" : "published");
      const data = await getAdminPrompts({ ...filters, page, limit: PAGE_SIZE });
      setResult(data);
      setMessage(prompt.status === "published" ? "Prompt unpublished and saved as a draft." : "Prompt published on the public library.");
    } catch (actionError) { setError(actionError.message); }
    finally { setBusy(false); }
  };
  const removePrompt = async (prompt) => {
    if (!window.confirm(`Permanently delete "${prompt.title}" (${prompt.promptId}) and its uploaded images?`)) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await deleteAdminPrompt(prompt.promptId);
      setResult(await getAdminPrompts({ ...filters, page, limit: PAGE_SIZE }));
      setMessage("Prompt deleted.");
    } catch (actionError) { setError(actionError.message); }
    finally { setBusy(false); }
  };
  const duplicatePrompt = async (prompt) => {
    setBusy(true); setError(""); setMessage("");
    try {
      const copy = await duplicateAdminPrompt(prompt.promptId);
      navigate(`/admin/prompts/${encodeURIComponent(copy.promptId)}/edit`, { state: { message: `Draft copy created as ${copy.promptId}.` } });
    } catch (actionError) { setError(actionError.message); }
    finally { setBusy(false); }
  };

  return (
    <main className="prompt-admin">
      <div className="prompt-admin__layout">
        <aside>
          <span className="prompt-admin__eyebrow">ADMIN WORKSPACE</span>
          <h1>AI Prompts</h1>
          <PromptAdminNav />
        </aside>
        <div className="prompt-admin__content">
          <header className="prompt-admin__heading">
            <div><span className="prompt-admin__eyebrow">PROMPT LIBRARY</span><h2>{view === "categories" ? "Categories" : view === "images" ? "Generated Images" : "All Prompts"}</h2><p>Create, organize, and publish reusable AI prompts for visitors.</p></div>
            <Link className="prompt-admin__button" to="/admin/prompts/new"><Plus size={17} />Add New Prompt</Link>
          </header>
          {error && <p className="prompt-admin__notice prompt-admin__notice--error" role="alert">{error}</p>}
          {message && <p className="prompt-admin__notice" role="status">{message}</p>}
          {view === "categories" ? <CategoryManager categories={categories} onChange={() => loadCategories().catch((loadError) => setError(loadError.message))} setError={setError} setMessage={setMessage} /> : null}
          {view === "images" && (
            <>
              <GeneratedImages prompts={result.items} />
              {result.pages > 1 && <div className="prompt-admin__pagination"><button disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)}><ArrowLeft size={15} />Previous</button><span>Page {result.page} of {result.pages} · {result.total} prompts</span><button disabled={page >= result.pages || loading} onClick={() => setPage((current) => current + 1)}>Next<ArrowRight size={15} /></button></div>}
            </>
          )}
          {view === "all" && (
            <section className="prompt-admin__panel">
              <div className="prompt-admin__filters">
                <label className="prompt-admin__search"><Search size={17} /><input aria-label="Search prompts by title or exact ID" placeholder="Search title or VTX-PMT-000001" value={filters.q} onChange={(event) => setFilter("q", event.target.value)} /></label>
                <select aria-label="Filter by category" value={filters.category} onChange={(event) => setFilter("category", event.target.value)}><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                <select aria-label="Filter by status" value={filters.status} onChange={(event) => setFilter("status", event.target.value)}><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select>
              </div>
              {loading ? <p className="prompt-admin__empty" role="status">Loading prompts…</p> : result.items.length === 0 ? <p className="prompt-admin__empty">No prompts found. Try changing the filters or add a prompt.</p> : (
                <div className="prompt-admin__table-wrap"><table>
                  <thead><tr><th>Prompt ID</th><th>Title</th><th>Category</th><th>AI tools</th><th>Cover</th><th>Status</th><th>Featured</th><th>Created</th><th>Actions</th></tr></thead>
                  <tbody>{result.items.map((prompt) => <tr key={prompt.promptId}>
                    <td><code>{prompt.promptId}</code></td>
                    <td><strong>{prompt.title}</strong></td>
                    <td>{prompt.category.name}</td>
                    <td>{prompt.aiTools.join(", ") || "—"}</td>
                    <td>{prompt.coverImage ? <img className="prompt-admin__cover-thumb" src={apiUrl(prompt.coverImage.url)} alt="" /> : "—"}</td>
                    <td><span className={`prompt-admin__status prompt-admin__status--${prompt.status}`}>{prompt.status}</span></td>
                    <td>{prompt.featured ? <Star size={16} fill="currentColor" /> : "—"}</td>
                    <td>{dateLabel(prompt.createdAt)}</td>
                    <td><div className="prompt-admin__actions">
                      <button type="button" title="View" aria-label={`View ${prompt.title}`} onClick={() => prompt.status === "published" ? navigate(`/prompts/${encodeURIComponent(prompt.promptId)}`) : setPreview(prompt)}><Eye size={16} /></button>
                      <button type="button" title="Preview" aria-label={`Preview ${prompt.title}`} onClick={() => setPreview(prompt)}><Eye size={16} /></button>
                      <Link title="Edit" aria-label={`Edit ${prompt.title}`} to={`/admin/prompts/${encodeURIComponent(prompt.promptId)}/edit`}><Pencil size={16} /></Link>
                      <button type="button" disabled={busy} title={prompt.status === "published" ? "Unpublish" : "Publish"} onClick={() => setStatus(prompt)}>{prompt.status === "published" ? <X size={16} /> : <Sparkles size={16} />}</button>
                      <button type="button" disabled={busy} title="Duplicate" aria-label={`Duplicate ${prompt.title}`} onClick={() => duplicatePrompt(prompt)}><Copy size={16} /></button>
                      <button type="button" disabled={busy} title="Delete" aria-label={`Delete ${prompt.title}`} onClick={() => removePrompt(prompt)}><Trash2 size={16} /></button>
                    </div></td>
                  </tr>)}</tbody>
                </table></div>
              )}
              {result.pages > 1 && <div className="prompt-admin__pagination"><button disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)}><ArrowLeft size={15} />Previous</button><span>Page {result.page} of {result.pages} · {result.total} prompts</span><button disabled={page >= result.pages || loading} onClick={() => setPage((current) => current + 1)}>Next<ArrowRight size={15} /></button></div>}
            </section>
          )}
        </div>
      </div>
      <PromptPreview prompt={preview} onClose={() => setPreview(null)} />
    </main>
  );
}

export function PromptEditor() {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(EMPTY_PROMPT);
  const [categories, setCategories] = useState([]);
  const [saved, setSaved] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [exampleFiles, setExampleFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [coverPreview, setCoverPreview] = useState("");
  const [examplePreviews, setExamplePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState("");
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [keepCover, setKeepCover] = useState(null);
  const [keepExamples, setKeepExamples] = useState([]);
  const [keepVideo, setKeepVideo] = useState(null);
  const [keepDocuments, setKeepDocuments] = useState([]);
  const [loading, setLoading] = useState(Boolean(promptId));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(location.state?.message || "");
  const [preview, setPreview] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    let active = true;
    Promise.all([getAdminPromptCategories(), promptId ? getAdminPrompt(promptId) : Promise.resolve(null)])
      .then(([nextCategories, prompt]) => {
        if (!active) return;
        setCategories(nextCategories);
        if (prompt) {
          setSaved(prompt);
          setForm(promptFormData(prompt));
          setKeepCover(prompt.coverImage);
          setKeepExamples(prompt.exampleImages || []);
          setKeepVideo(prompt.videos?.[0] || null);
          setKeepDocuments(prompt.documents || []);
        } else if (nextCategories[0]) {
          setForm((current) => ({ ...current, categoryId: nextCategories[0].id }));
        }
      })
      .catch((loadError) => { if (active) setError(loadError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [promptId]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setSelectedCover = (file) => {
    setCoverFile(file || null);
    setCoverPreview((current) => { if (current) URL.revokeObjectURL(current); return file ? URL.createObjectURL(file) : ""; });
  };
  const setSelectedExamples = (files) => {
    examplePreviews.forEach((url) => URL.revokeObjectURL(url));
    const selected = Array.from(files || []);
    setExampleFiles(selected);
    setExamplePreviews(selected.map((file) => URL.createObjectURL(file)));
  };
  const setSelectedVideo = (file) => {
    setVideoPreview((current) => { if (current) URL.revokeObjectURL(current); return file ? URL.createObjectURL(file) : ""; });
    setVideoFile(file || null);
  };
  const setSelectedDocuments = (files) => {
    documentPreviews.forEach((item) => URL.revokeObjectURL(item.url));
    const selected = Array.from(files || []);
    setDocumentFiles(selected);
    setDocumentPreviews(selected.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })));
  };
  const reset = () => {
    setError(""); setMessage(""); setSelectedCover(null); setSelectedExamples([]); setSelectedVideo(null); setSelectedDocuments([]);
    if (saved) {
      setForm(promptFormData(saved));
      setKeepCover(saved.coverImage);
      setKeepExamples(saved.exampleImages || []);
      setKeepVideo(saved.videos?.[0] || null);
      setKeepDocuments(saved.documents || []);
    } else {
      setForm({ ...EMPTY_PROMPT, categoryId: categories[0]?.id || "" });
      setKeepCover(null); setKeepExamples([]); setKeepVideo(null); setKeepDocuments([]);
    }
  };
  const submit = async (status) => {
    if (!formRef.current?.reportValidity()) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const result = await saveAdminPrompt(promptPayload(form, status), {
        promptId: saved?.promptId,
        coverFile,
        exampleFiles,
        videoFile,
        documentFiles,
        keepCoverId: keepCover?.id,
        keepExampleImageIds: keepExamples.map((image) => image.id),
        keepVideoIds: keepVideo ? [keepVideo.id] : [],
        keepDocumentIds: keepDocuments.map((document) => document.id),
      });
      setSaved(result);
      setForm(promptFormData(result));
      setKeepCover(result.coverImage);
      setKeepExamples(result.exampleImages || []);
      setKeepVideo(result.videos?.[0] || null);
      setKeepDocuments(result.documents || []);
      setSelectedCover(null); setSelectedExamples([]); setSelectedVideo(null); setSelectedDocuments([]);
      setMessage(status === "published" ? "Prompt published and available on the public Prompts page." : "Prompt saved as a draft.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  };

  const previewPrompt = {
    ...form,
    promptId: saved?.promptId,
    categoryName: categories.find((category) => category.id === form.categoryId)?.name || "",
    coverImage: coverPreview ? { url: coverPreview } : keepCover,
    exampleImages: [...keepExamples, ...examplePreviews.map((url, index) => ({ id: `new-${index}`, url, name: "New image" }))],
    videos: videoPreview ? [{ id: "new-video", url: videoPreview, name: videoFile?.name || "Video" }] : (keepVideo ? [keepVideo] : []),
    documents: [...keepDocuments, ...documentPreviews.map((item, index) => ({ id: `new-document-${index}`, ...item }))],
  };
  const isValidImage = (file) => file && ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type);
  const changeCover = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!isValidImage(file) || file.size > 10 * 1024 * 1024) { setError("Choose a JPG, PNG, GIF, or WebP cover image no larger than 10 MB."); event.target.value = ""; return; }
    setError(""); setSelectedCover(file);
  };
  const changeExamples = (event) => {
    const files = Array.from(event.target.files || []);
    const existingCount = keepExamples.length;
    if (files.some((file) => !isValidImage(file) || file.size > 10 * 1024 * 1024) || existingCount + files.length > 6) {
      setError("Choose up to six JPG, PNG, GIF, or WebP example images, each no larger than 10 MB.");
      event.target.value = "";
      return;
    }
    setError(""); setSelectedExamples(files);
  };
  const changeVideo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["video/mp4", "video/webm"].includes(file.type) || file.size > 20 * 1024 * 1024) {
      setError("Choose an MP4 or WebM video no larger than 20 MB."); event.target.value = ""; return;
    }
    setError(""); setSelectedVideo(file);
  };
  const changeDocuments = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.some((file) => file.type !== "application/pdf" || file.size > 25 * 1024 * 1024)
      || keepDocuments.length + files.length > 3) {
      setError("Choose up to three PDF files, each no larger than 25 MB."); event.target.value = ""; return;
    }
    setError(""); setSelectedDocuments(files);
  };

  return (
    <main className="prompt-admin">
      <div className="prompt-admin__layout">
        <aside><span className="prompt-admin__eyebrow">ADMIN WORKSPACE</span><h1>AI Prompts</h1><PromptAdminNav /></aside>
        <div className="prompt-admin__content">
          <header className="prompt-admin__heading"><div><span className="prompt-admin__eyebrow">PROMPT EDITOR</span><h2>{saved ? "Edit prompt" : "Add a new prompt"}</h2><p>Build a reusable prompt and publish it to the public library.</p></div><Link className="prompt-admin__button prompt-admin__button--quiet" to="/admin/prompts"><ArrowLeft size={16} />All prompts</Link></header>
          {error && <p className="prompt-admin__notice prompt-admin__notice--error" role="alert">{error}</p>}
          {message && <p className="prompt-admin__notice" role="status">{message}</p>}
          {loading ? <p className="prompt-admin__empty" role="status">Loading prompt…</p> : (
            <form ref={(element) => { formRef.current = element; }} className="prompt-admin__form" onSubmit={(event) => event.preventDefault()}>
              <section className="prompt-admin__panel">
                <h3>Basic information</h3>
                {saved && <div className="prompt-admin__id"><span>Prompt ID</span><code>{saved.promptId}</code><button type="button" className="prompt-admin__button prompt-admin__button--quiet" onClick={async () => { try { await navigator.clipboard.writeText(saved.promptId); setMessage("Prompt ID copied."); } catch (copyError) { setError(`Could not copy ID: ${copyError.message}`); } }}><Copy size={15} />Copy ID</button></div>}
                <div className="prompt-admin__form-grid">
                  <label>Prompt title *<input required maxLength={160} value={form.title} onChange={(event) => update("title", event.target.value)} /></label>
                  <label>Category *<select required value={form.categoryId} onChange={(event) => update("categoryId", event.target.value)}><option value="">Choose a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                  <label className="is-wide">Short description *<textarea required maxLength={1000} rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} /></label>
                  <label className="is-wide">Full prompt text *<textarea required maxLength={20000} rows={9} value={form.promptText} onChange={(event) => update("promptText", event.target.value)} placeholder="Write the complete reusable prompt. Use [placeholders] for values users should customize." /></label>
                  <label>Tags<input maxLength={1200} value={form.tagsText} onChange={(event) => update("tagsText", event.target.value)} placeholder="writing, marketing, product" /><small>Comma-separated; up to 30 tags.</small></label>
                  <label>Difficulty<select value={form.difficulty} onChange={(event) => update("difficulty", event.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
                  <fieldset className="prompt-admin__tools is-wide"><legend>Supported AI tools</legend>{TOOLS.map((tool) => <label key={tool}><input type="checkbox" checked={form.aiTools.includes(tool)} onChange={(event) => update("aiTools", event.target.checked ? [...form.aiTools, tool] : form.aiTools.filter((item) => item !== tool))} />{tool}</label>)}</fieldset>
                </div>
              </section>
              <section className="prompt-admin__panel">
                <h3>Images and attachments</h3>
                <div className="prompt-admin__image-fields">
                  <div><label className="prompt-admin__upload"><Upload size={18} />Cover image<input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={changeCover} /></label>{coverPreview || keepCover ? <div className="prompt-admin__image-preview"><img src={coverPreview || apiUrl(keepCover.url)} alt="Cover preview" /><button type="button" onClick={() => { setSelectedCover(null); setKeepCover(null); }} aria-label="Remove cover image"><X size={15} /></button></div> : <p className="prompt-admin__muted">Optional · up to 10 MB</p>}</div>
                  <div><label className="prompt-admin__upload"><ImagePlus size={18} />Example output images<input type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp" onChange={changeExamples} /></label><small>Up to six images, 10 MB each. Select all new files together.</small>
                    <div className="prompt-admin__image-previews">
                      {keepExamples.map((image) => <div className="prompt-admin__image-preview" key={image.id}><img src={apiUrl(image.url)} alt={image.name} /><button type="button" onClick={() => setKeepExamples((current) => current.filter((item) => item.id !== image.id))} aria-label={`Remove ${image.name}`}><X size={15} /></button></div>)}
                      {examplePreviews.map((url, index) => <div className="prompt-admin__image-preview" key={url}><img src={url} alt={`New example ${index + 1}`} /><button type="button" onClick={() => { const files = exampleFiles.filter((_, itemIndex) => itemIndex !== index); setSelectedExamples(files); }} aria-label={`Remove selected example ${index + 1}`}><X size={15} /></button></div>)}
                    </div>
                  </div>
                  <div className="prompt-admin__attachment-fields">
                    <div>
                      <label className="prompt-admin__upload"><Upload size={18} />{keepVideo || videoPreview ? "Replace video" : "Upload video"}<input type="file" accept="video/mp4,video/webm,.mp4,.webm" onChange={changeVideo} /></label>
                      <small>Optional · one MP4 or WebM video, up to 20 MB.</small>
                      {(videoPreview || keepVideo) && <div className="prompt-admin__attachment-preview">
                        <video src={videoPreview || apiUrl(keepVideo.url)} controls preload="metadata" />
                        <button type="button" onClick={() => { setSelectedVideo(null); setKeepVideo(null); }} aria-label="Remove prompt video"><X size={15} /></button>
                      </div>}
                    </div>
                    <div>
                      <label className="prompt-admin__upload"><FileText size={18} />Upload PDF files<input type="file" multiple accept="application/pdf,.pdf" onChange={changeDocuments} /></label>
                      <small>Optional · up to three PDF files, 25 MB each.</small>
                      <ul className="prompt-admin__document-list">
                        {keepDocuments.map((document) => <li key={document.id}><a href={apiUrl(document.url)} target="_blank" rel="noreferrer">{document.name}</a><button type="button" onClick={() => setKeepDocuments((current) => current.filter((item) => item.id !== document.id))} aria-label={`Remove ${document.name}`}><X size={15} /></button></li>)}
                        {documentPreviews.map((document, index) => <li key={document.url}><a href={document.url} target="_blank" rel="noreferrer">{document.name}</a><button type="button" onClick={() => setSelectedDocuments(documentFiles.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${document.name}`}><X size={15} /></button></li>)}
                      </ul>
                    </div>
                  </div>
                  <label className="prompt-admin__external">External example image URL<input type="url" inputMode="url" placeholder="https://…" value={form.externalExampleImageUrl} onChange={(event) => update("externalExampleImageUrl", event.target.value)} /><small>HTTPS image links only.</small></label>
                </div>
              </section>
              <section className="prompt-admin__panel">
                <h3>Publishing settings</h3>
                <label className="prompt-admin__check"><input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} />Feature on the Prompts page</label>
                <label className="prompt-admin__check"><input type="checkbox" checked={form.generateImage} onChange={(event) => update("generateImage", event.target.checked)} />Enable image generation for this prompt</label>
                {form.generateImage && <p className="prompt-admin__muted">No image-generation provider is configured on this site yet. The public Generate Image action stays hidden until a provider is securely integrated.</p>}
                <label className="prompt-admin__status-select">Publication status<select value={form.status} onChange={(event) => update("status", event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
                <div className="prompt-admin__form-actions">
                  <button type="button" className="prompt-admin__button prompt-admin__button--quiet" disabled={busy} onClick={reset}>Reset form</button>
                  <button type="button" className="prompt-admin__button prompt-admin__button--quiet" onClick={() => setPreview(true)}><Eye size={16} />Preview</button>
                  <button type="button" className="prompt-admin__button prompt-admin__button--quiet" disabled={busy} onClick={() => submit("draft")}>Save draft</button>
                  <button type="button" className="prompt-admin__button" disabled={busy} onClick={() => submit("published")}><Sparkles size={16} />{busy ? "Saving…" : "Publish prompt"}</button>
                  <button type="button" className="prompt-admin__text-button" onClick={() => navigate("/admin/prompts")}>Cancel</button>
                </div>
              </section>
            </form>
          )}
        </div>
      </div>
      {preview && <PromptPreview prompt={previewPrompt} onClose={() => setPreview(false)} />}
    </main>
  );
}
