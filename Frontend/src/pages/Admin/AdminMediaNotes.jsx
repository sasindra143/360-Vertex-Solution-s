import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Layers,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import {
  createAdminCategory,
  deleteAdminCategory,
  deleteAdminNote,
  getAdminCategories,
  getAdminNotes,
  getNotesDashboard,
  migrateLegacyLocalNotes,
  publishAdminNote,
  unpublishAdminNote,
  updateAdminCategory,
} from "./mediaNotesStorage";
import { apiUrl } from "../../utils/api";
import "./AdminMediaNotes.css";

const PAGE_SIZE = 10;
const EMPTY_PAGE = { items: [], page: 1, pages: 0, total: 0 };
const EMPTY_DASHBOARD = { total: 0, drafts: 0, published: 0, categories: 0, recent: [] };

function formattedDate(value) {
  if (!value) return "Not published";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

export default function AdminMediaNotes() {
  const location = useLocation();
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [pageData, setPageData] = useState(EMPTY_PAGE);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    status: "",
    category: "",
    tag: "",
    type: "",
    sort: "newest",
  });
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", description: "" });
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (location.state?.message) setMessage(location.state.message);
  }, [location.state]);

  const reloadDashboard = useCallback(async () => {
    const [nextDashboard, nextCategories] = await Promise.all([
      getNotesDashboard(),
      getAdminCategories(),
    ]);
    setDashboard(nextDashboard);
    setCategories(nextCategories);
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const nextCategories = await getAdminCategories();
        let migrationMessage = "";
        if (nextCategories[0]) {
          const migrated = await migrateLegacyLocalNotes(nextCategories[0].id);
          if (migrated) migrationMessage = `${migrated} locally saved ${migrated === 1 ? "note was" : "notes were"} imported.`;
        }
        const [updatedDashboard, updatedCategories] = await Promise.all([
          getNotesDashboard(),
          getAdminCategories(),
        ]);
        if (!active) return;
        setDashboard(updatedDashboard);
        setCategories(updatedCategories);
        if (migrationMessage) setMessage(migrationMessage);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setInitialLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setLoadingNotes(true);
    const timer = window.setTimeout(async () => {
      try {
        const results = await getAdminNotes({ ...filters, page, limit: PAGE_SIZE });
        if (active) {
          setPageData(results);
          setError("");
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoadingNotes(false);
      }
    }, filters.q ? 250 : 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [filters, page]);

  const setFilter = (name, value) => {
    setPage(1);
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleDelete = async (note) => {
    if (!window.confirm(`Delete "${note.title}"? Its note record will be removed.`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await deleteAdminNote(note.id);
      await Promise.all([reloadDashboard(), getAdminNotes({ ...filters, page, limit: PAGE_SIZE }).then(setPageData)]);
      setMessage("Note deleted.");
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setBusy(false);
    }
  };

  const handlePublishToggle = async (note) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (note.status === "published") await unpublishAdminNote(note.id);
      else await publishAdminNote(note.id);
      await Promise.all([reloadDashboard(), getAdminNotes({ ...filters, page, limit: PAGE_SIZE }).then(setPageData)]);
      setMessage(note.status === "published" ? "Note moved to drafts." : "Note published.");
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async (note) => {
    try {
      await navigator.clipboard.writeText(
        new URL(`/students/notes/${encodeURIComponent(note.slug)}`, window.location.origin).toString()
      );
      setMessage(`Public link copied for "${note.title}".`);
      setError("");
    } catch (copyError) {
      setError(`Could not copy the link: ${copyError.message || "Clipboard access is unavailable."}`);
    }
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (editingCategoryId) await updateAdminCategory(editingCategoryId, categoryForm);
      else await createAdminCategory(categoryForm);
      setCategoryForm({ name: "", slug: "", description: "" });
      setEditingCategoryId("");
      await reloadDashboard();
      setMessage("Category saved.");
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setBusy(false);
    }
  };

  const handleCategoryEdit = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ name: category.name, slug: category.slug, description: category.description || "" });
  };

  const handleCategoryDelete = async (category) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    setBusy(true);
    setError("");
    try {
      await deleteAdminCategory(category.id);
      await reloadDashboard();
      if (filters.category === category.id) setFilter("category", "");
      setMessage("Category deleted.");
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setBusy(false);
    }
  };

  const displayNotes = pageData.items || [];

  return (
    <main className="notes-admin">
      <div className="notes-admin__container">
        <header className="notes-admin__heading">
          <div>
            <span className="notes-admin__eyebrow">CONTENT STUDIO</span>
            <h1>Notes management</h1>
            <p>Create, organize, and publish learning resources from one place.</p>
          </div>
          <div className="notes-admin__heading-actions">
            <button className="notes-admin__button notes-admin__button--quiet" type="button" onClick={() => {
              Promise.all([reloadDashboard(), getAdminNotes({ ...filters, page, limit: PAGE_SIZE }).then(setPageData)])
                .catch((refreshError) => setError(refreshError.message));
            }}>
              <RefreshCw size={17} aria-hidden="true" /> Refresh
            </button>
            <Link className="notes-admin__button" to="/admin/media-notes/new">
              <Plus size={18} aria-hidden="true" /> New note
            </Link>
            <Link className="notes-admin__button notes-admin__button--quiet" to="/admin/prompts">
              <Sparkles size={17} aria-hidden="true" /> AI Prompts
            </Link>
            <Link className="notes-admin__button" to="/admin/prompts/new">
              <Plus size={18} aria-hidden="true" /> Add New Prompt
            </Link>
            <Link className="notes-admin__button notes-admin__button--quiet" to="/admin/jobs">
              <BriefcaseBusiness size={17} aria-hidden="true" /> Job Updates
            </Link>
          </div>
        </header>

        {error && <p className="notes-admin__notice notes-admin__notice--error" role="alert">{error}</p>}
        {message && <p className="notes-admin__notice" role="status">{message}</p>}

        <section className="notes-admin__stats" aria-label="Notes summary">
          <article><span><FileText size={18} /> Total notes</span><strong>{dashboard.total}</strong></article>
          <article><span><Layers size={18} /> Drafts</span><strong>{dashboard.drafts}</strong></article>
          <article><span><BadgeCheck size={18} /> Published</span><strong>{dashboard.published}</strong></article>
          <article><span><Tags size={18} /> Categories</span><strong>{dashboard.categories}</strong></article>
        </section>

        <section className="notes-admin__panel" aria-labelledby="notes-list-heading">
          <div className="notes-admin__panel-heading">
            <div>
              <span className="notes-admin__eyebrow">LIBRARY</span>
              <h2 id="notes-list-heading">All notes <span>{pageData.total}</span></h2>
            </div>
            <button className="notes-admin__button notes-admin__button--quiet" type="button" onClick={() => setCategoryOpen((open) => !open)}>
              <Tags size={17} aria-hidden="true" /> {categoryOpen ? "Close categories" : "Manage categories"}
            </button>
          </div>

          {categoryOpen && (
            <section className="notes-admin__categories" aria-label="Manage note categories">
              <form className="notes-admin__category-form" onSubmit={handleCategorySubmit}>
                <h3>{editingCategoryId ? "Edit category" : "Add a category"}</h3>
                <label>
                  Name
                  <input value={categoryForm.name} maxLength={60} required onChange={(event) => {
                    const name = event.target.value;
                    setCategoryForm((current) => ({
                      ...current,
                      name,
                      slug: editingCategoryId ? current.slug : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                    }));
                  }} />
                </label>
                <label>
                  Slug
                  <input value={categoryForm.slug} maxLength={80} required onChange={(event) => setCategoryForm((current) => ({ ...current, slug: event.target.value }))} />
                </label>
                <label>
                  Description
                  <input value={categoryForm.description} maxLength={240} onChange={(event) => setCategoryForm((current) => ({ ...current, description: event.target.value }))} />
                </label>
                <div className="notes-admin__actions">
                  <button className="notes-admin__button" type="submit" disabled={busy}>{editingCategoryId ? "Save category" : "Add category"}</button>
                  {editingCategoryId && <button className="notes-admin__button notes-admin__button--quiet" type="button" onClick={() => {
                    setEditingCategoryId("");
                    setCategoryForm({ name: "", slug: "", description: "" });
                  }}>Cancel</button>}
                </div>
              </form>
              <ul className="notes-admin__category-list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <div><strong>{category.name}</strong><span>/{category.slug} · {category.count} notes</span></div>
                    <div className="notes-admin__inline-actions">
                      <button type="button" aria-label={`Edit ${category.name}`} onClick={() => handleCategoryEdit(category)}><Edit3 size={16} /></button>
                      <button type="button" aria-label={`Delete ${category.name}`} onClick={() => handleCategoryDelete(category)}><Trash2 size={16} /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="notes-admin__filters">
            <label className="notes-admin__search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search notes</span>
              <input placeholder="Search title, summary, or tag" value={filters.q} onChange={(event) => setFilter("q", event.target.value)} />
            </label>
            <label><span className="sr-only">Filter by status</span>
              <select value={filters.status} onChange={(event) => setFilter("status", event.target.value)}>
                <option value="">All statuses</option><option value="draft">Drafts</option><option value="published">Published</option>
              </select>
            </label>
            <label><span className="sr-only">Filter by category</span>
              <select value={filters.category} onChange={(event) => setFilter("category", event.target.value)}>
                <option value="">All categories</option>
                {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
              </select>
            </label>
            <label><span className="sr-only">Filter by tag</span>
              <input placeholder="Tag" value={filters.tag} onChange={(event) => setFilter("tag", event.target.value)} />
            </label>
            <label><span className="sr-only">Filter by content type</span>
              <select value={filters.type} onChange={(event) => setFilter("type", event.target.value)}>
                <option value="">All content</option>
                {["richText", "image", "gallery", "video", "document", "callout", "link"].map((type) => <option key={type} value={type}>{type === "richText" ? "Rich text" : type}</option>)}
              </select>
            </label>
            <label><span className="sr-only">Sort notes</span>
              <select value={filters.sort} onChange={(event) => setFilter("sort", event.target.value)}>
                <option value="newest">Recently updated</option><option value="oldest">Oldest first</option><option value="title">Title A-Z</option>
              </select>
            </label>
          </div>

          {initialLoading || loadingNotes ? <p className="notes-admin__state" role="status">Loading notes…</p> : null}
          {!initialLoading && !loadingNotes && displayNotes.length === 0 && (
            <div className="notes-admin__empty">
              <FileText size={28} aria-hidden="true" />
              <h3>No notes match these filters</h3>
              <p>Create your first note or adjust the search and filters.</p>
              <Link className="notes-admin__button" to="/admin/media-notes/new"><Plus size={17} /> Create a note</Link>
            </div>
          )}

          {displayNotes.length > 0 && (
            <div className="notes-admin__table-wrap">
              <table className="notes-admin__table">
                <thead><tr><th>Note</th><th>Category</th><th>Status</th><th>Updated</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {displayNotes.map((note) => (
                    <tr key={note.id}>
                      <td>
                        <div className="notes-admin__note-cell">
                          {note.coverImage
                            ? <img src={apiUrl(note.coverImage.url)} alt="" loading="lazy" />
                            : <span className="notes-admin__thumbnail-placeholder"><FileText size={20} /></span>}
                          <div><strong>{note.title}</strong><span>{note.summary || "No summary yet"}</span></div>
                        </div>
                      </td>
                      <td>{note.category?.name || "Uncategorized"}</td>
                      <td><span className={`notes-admin__status notes-admin__status--${note.status}`}>{note.status}</span></td>
                      <td>{formattedDate(note.updatedAt)}</td>
                      <td>
                        <div className="notes-admin__row-actions">
                          <Link aria-label={`Edit ${note.title}`} title="Edit note" to={`/admin/media-notes/${note.id}/edit`}><Edit3 size={17} /></Link>
                          {note.status === "published" && <Link aria-label={`View ${note.title}`} title="View public note" target="_blank" to={`/students/notes/${encodeURIComponent(note.slug)}`}><ExternalLink size={17} /></Link>}
                          {note.status === "published" && <button type="button" aria-label={`Copy public link for ${note.title}`} title="Copy public link" onClick={() => handleShare(note)}><Copy size={17} /></button>}
                          <button type="button" disabled={busy} aria-label={note.status === "published" ? `Unpublish ${note.title}` : `Publish ${note.title}`} title={note.status === "published" ? "Unpublish" : "Publish"} onClick={() => handlePublishToggle(note)}>
                            {note.status === "published" ? <X size={17} /> : <BadgeCheck size={17} />}
                          </button>
                          <button type="button" disabled={busy} aria-label={`Delete ${note.title}`} title="Delete" onClick={() => handleDelete(note)}><Trash2 size={17} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pageData.pages > 1 && (
            <nav className="notes-admin__pagination" aria-label="Notes pages">
              <button type="button" disabled={page <= 1 || loadingNotes} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={18} /> Previous</button>
              <span>Page {pageData.page} of {pageData.pages}</span>
              <button type="button" disabled={page >= pageData.pages || loadingNotes} onClick={() => setPage((value) => value + 1)}>Next <ChevronRight size={18} /></button>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
