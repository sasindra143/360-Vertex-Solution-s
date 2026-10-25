import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  createAdminJob,
  deleteAdminJob,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  getAdminJob,
  getAdminJobs,
  getJobCategories,
  updateAdminJob,
  WORK_MODES,
} from "../CareerJobs/jobsApi";
import { apiUrl } from "../../utils/api";
import "./AdminJobs.css";

const PAGE_SIZE = 20;
const EMPTY_JOB = {
  title: "",
  companyName: "",
  companyLogoUrl: "",
  companyLogoName: "",
  companyLogoUploadId: "",
  companyLogoUploadUrl: "",
  notificationFile: null,
  category: "",
  employmentType: "Full-time",
  location: "",
  workMode: "On-site",
  experience: "Freshers",
  qualification: "",
  graduationYearsText: "",
  skillsText: "",
  salary: "",
  applicationStartDate: "",
  applicationDeadline: "",
  description: "",
  openings: "",
  applicationUrl: "",
  sourceUrl: "",
  lastVerifiedAt: "",
  status: "draft",
  featured: false,
};
const EMPTY_RESULTS = { items: [], page: 1, pages: 0, total: 0 };

function dateField(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function toJobForm(job) {
  return {
    ...EMPTY_JOB,
    ...job,
    companyLogoUrl: job.companyLogoName ? "" : (job.companyLogoUrl || ""),
    companyLogoUploadUrl: job.companyLogoName ? apiUrl(job.companyLogoUrl) : "",
    graduationYearsText: (job.graduationYears || []).join(", "),
    skillsText: (job.skills || []).join(", "),
    applicationStartDate: dateField(job.applicationStartDate),
    applicationDeadline: dateField(job.applicationDeadline),
    lastVerifiedAt: dateField(job.lastVerifiedAt),
    openings: job.openings ?? "",
  };
}

function toJobPayload(form, status = form.status) {
  const { graduationYearsText, skillsText, ...fields } = form;
  return {
    ...fields,
    status,
    openings: fields.openings === "" ? null : Number(fields.openings),
    graduationYears: graduationYearsText.split(",").map((value) => value.trim()).filter(Boolean).map(Number),
    skills: skillsText.split(",").map((value) => value.trim()).filter(Boolean),
  };
}

function displayDate(value) {
  if (!value) return "No deadline";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "No deadline" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function getStatusLabel(status) {
  return status === "closingSoon" ? "Closing soon" : status === "draft" ? "Draft" : status === "closed" ? "Closed" : "Open";
}

function JobEditor({
  form, categories, loadingJob, busy, onChange, onSave, onCancel, editing,
  logoFile, logoPreview, notificationPdf, notificationPreview, onLogoChange, onNotificationChange,
  onRemoveLogo, onRemoveNotification,
}) {
  const formRef = useRef(null);
  const [preview, setPreview] = useState(false);
  const set = (key, value) => onChange((current) => ({ ...current, [key]: value }));

  const submit = (status) => {
    if (!formRef.current?.reportValidity()) return;
    onSave(status);
  };

  return (
    <section className="jobs-admin__editor" aria-labelledby="job-editor-title">
      <header className="jobs-admin__editor-heading">
        <div><span className="jobs-admin__eyebrow">JOB EDITOR</span><h2 id="job-editor-title">{editing ? "Edit job" : "Add a job update"}</h2></div>
        {editing && <button type="button" className="jobs-admin__icon-button" onClick={onCancel} aria-label="Close job editor"><X size={18} /></button>}
      </header>
      {loadingJob ? <p className="jobs-admin__state" role="status">Loading job…</p> : (
        <>
          <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
            <div className="jobs-admin__form-grid">
              <label className="jobs-admin__field jobs-admin__field--wide">Job title *
                <input required maxLength={160} value={form.title} onChange={(event) => set("title", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Company name *
                <input required maxLength={120} value={form.companyName} onChange={(event) => set("companyName", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Company logo URL
                <input type="url" placeholder="https://…" value={form.companyLogoUrl} onChange={(event) => {
                  const value = event.target.value;
                  set("companyLogoUrl", value);
                  if (value) {
                    set("companyLogoName", "");
                    set("companyLogoUploadId", "");
                    set("companyLogoUploadUrl", "");
                  }
                }} />
              </label>
              <div className="jobs-admin__field jobs-admin__field--wide">
                <span>Or upload a company logo</span>
                <label className="jobs-admin__upload"><Upload size={16} />{logoFile || form.companyLogoName ? "Replace logo" : "Upload logo"}<input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" onChange={onLogoChange} /></label>
                <small>Optional · JPG, PNG, or WebP · up to 10 MB.</small>
                {(logoPreview || form.companyLogoUploadUrl) && <div className="jobs-admin__upload-preview"><img src={logoPreview || form.companyLogoUploadUrl} alt="Company logo preview" /><button type="button" aria-label="Remove uploaded company logo" onClick={onRemoveLogo}><X size={15} /></button></div>}
              </div>
              <label className="jobs-admin__field">Job category *
                <select required value={form.category} onChange={(event) => set("category", event.target.value)}>
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </label>
              <label className="jobs-admin__field">Employment type *
                <select required value={form.employmentType} onChange={(event) => set("employmentType", event.target.value)}>
                  {EMPLOYMENT_TYPES.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label className="jobs-admin__field">Location *
                <input required maxLength={120} placeholder="City, State or Anywhere" value={form.location} onChange={(event) => set("location", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Work mode *
                <select required value={form.workMode} onChange={(event) => set("workMode", event.target.value)}>
                  {WORK_MODES.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label className="jobs-admin__field">Experience *
                <select required value={form.experience} onChange={(event) => set("experience", event.target.value)}>
                  {EXPERIENCE_LEVELS.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label className="jobs-admin__field">Salary / CTC
                <input maxLength={120} placeholder="Only if stated in the official notice" value={form.salary} onChange={(event) => set("salary", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Number of openings
                <input type="number" min="1" max="100000" step="1" value={form.openings} onChange={(event) => set("openings", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Application opens
                <input type="date" value={form.applicationStartDate} onChange={(event) => set("applicationStartDate", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Application deadline
                <input type="date" value={form.applicationDeadline} onChange={(event) => set("applicationDeadline", event.target.value)} />
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Qualification / eligibility
                <textarea rows="3" maxLength={1000} value={form.qualification} onChange={(event) => set("qualification", event.target.value)} />
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Eligible graduation years
                <input placeholder="Example: 2025, 2026" value={form.graduationYearsText} onChange={(event) => set("graduationYearsText", event.target.value)} />
                <small>Enter comma-separated years only when the official notice states them.</small>
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Required skills / technologies
                <input placeholder="Java, Spring Boot, React" value={form.skillsText} onChange={(event) => set("skillsText", event.target.value)} />
                <small>Separate skills with commas; use only requirements from the source.</small>
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Job description *
                <textarea required rows="7" maxLength={12000} value={form.description} onChange={(event) => set("description", event.target.value)} />
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Official application URL
                <input type="url" placeholder="https://company.example/careers/job" value={form.applicationUrl} onChange={(event) => set("applicationUrl", event.target.value)} />
              </label>
              <label className="jobs-admin__field jobs-admin__field--wide">Official notification / source URL
                <input type="url" placeholder="https://company.example/official-notice" value={form.sourceUrl} onChange={(event) => set("sourceUrl", event.target.value)} />
                <small>Both official URLs and the verification date are required to publish.</small>
              </label>
              <div className="jobs-admin__field jobs-admin__field--wide">
                <span>Upload official notification PDF</span>
                <label className="jobs-admin__upload"><FileText size={16} />{notificationPdf || form.notificationFile ? "Replace notification PDF" : "Upload notification PDF"}<input type="file" accept="application/pdf,.pdf" onChange={onNotificationChange} /></label>
                <small>Optional · PDF · up to 25 MB. The official source URL is still required when publishing.</small>
                {(notificationPreview || form.notificationFile) && <div className="jobs-admin__notification-preview">
                  <a href={notificationPreview || form.notificationFile.url} target="_blank" rel="noreferrer">{form.notificationFile?.name || notificationPdf?.name || "Preview selected PDF"}</a>
                  <button type="button" aria-label="Remove uploaded notification PDF" onClick={onRemoveNotification}><X size={15} /></button>
                </div>}
              </div>
              <label className="jobs-admin__field">Last verified date
                <input type="date" value={form.lastVerifiedAt} onChange={(event) => set("lastVerifiedAt", event.target.value)} />
              </label>
              <label className="jobs-admin__field">Publishing state
                <select value={form.status} onChange={(event) => set("status", event.target.value)}>
                  <option value="draft">Draft (not public)</option>
                  <option value="open">Open / publish</option>
                  <option value="closed">Closed (visible for reference)</option>
                </select>
              </label>
              <label className="jobs-admin__checkbox jobs-admin__field--wide">
                <input type="checkbox" checked={form.featured} onChange={(event) => set("featured", event.target.checked)} />
                Feature this verified opportunity
              </label>
            </div>
            <div className="jobs-admin__editor-actions">
              <button className="jobs-admin__button jobs-admin__button--quiet" type="button" onClick={() => setPreview((value) => !value)}>
                <Eye size={16} /> {preview ? "Hide preview" : "Preview"}
              </button>
              <span className="jobs-admin__actions-spacer" />
              {editing && <button className="jobs-admin__button jobs-admin__button--quiet" type="button" disabled={busy} onClick={onCancel}>Cancel</button>}
              <button className="jobs-admin__button jobs-admin__button--quiet" type="button" disabled={busy} onClick={() => submit("draft")}>
                <Save size={16} /> Save draft
              </button>
              <button className="jobs-admin__button" type="button" disabled={busy} onClick={() => submit(form.status === "closed" ? "closed" : "open")}>
                <Check size={16} /> {busy ? "Saving…" : form.status === "closed" ? "Save as closed" : "Save & publish"}
              </button>
            </div>
          </form>
          {preview && (
            <article className="jobs-admin__preview" aria-label="Job preview">
              <span className="jobs-admin__eyebrow">PREVIEW · {getStatusLabel(form.status)}</span>
              <h3>{form.title || "Job title"}</h3>
              <p>{form.companyName || "Company"} · {form.location || "Location"} · {form.workMode}</p>
              <p>{form.description || "Add the verified job description to preview it here."}</p>
              {form.skillsText && <small>Skills: {form.skillsText}</small>}
            </article>
          )}
        </>
      )}
    </section>
  );
}

export default function AdminJobs() {
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [dashboard, setDashboard] = useState({ total: 0, drafts: 0, open: 0, closed: 0, featured: 0 });
  const [filters, setFilters] = useState({ q: "", status: "" });
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(EMPTY_JOB);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [notificationPdf, setNotificationPdf] = useState(null);
  const [notificationPreview, setNotificationPreview] = useState("");
  const [editingId, setEditingId] = useState("");
  const [loadingJob, setLoadingJob] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    getJobCategories()
      .then(setCategories)
      .catch((requestError) => setError(requestError.message));
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const next = await getAdminJobs({ ...filters, page, limit: PAGE_SIZE });
        if (active) {
          setResults(next);
          setDashboard(next.dashboard);
          setError("");
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }, filters.q ? 250 : 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [filters, page, reloadToken]);

  const reload = useCallback(() => setReloadToken((value) => value + 1), []);
  const startNew = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    if (notificationPreview) URL.revokeObjectURL(notificationPreview);
    setLogoFile(null); setLogoPreview(""); setNotificationPdf(null); setNotificationPreview("");
    setEditingId("");
    setForm({ ...EMPTY_JOB, category: categories[0]?.id || "" });
    setError("");
    setMessage("");
  };
  const editJob = async (job) => {
    setEditingId(job.id);
    setLoadingJob(true);
    setError("");
    setMessage("");
    try {
      const loaded = await getAdminJob(job.id);
      setForm(toJobForm(loaded));
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (notificationPreview) URL.revokeObjectURL(notificationPreview);
      setLogoFile(null); setLogoPreview(""); setNotificationPdf(null); setNotificationPreview("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoadingJob(false);
    }
  };

  const saveJob = async (status) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const payload = toJobPayload(form, status);
      const uploads = {
        logoFile,
        notificationFile: notificationPdf,
        keepLogoId: logoFile ? "" : form.companyLogoUploadId,
        keepNotificationFileId: notificationPdf ? "" : form.notificationFile?.id,
      };
      const saved = editingId
        ? await updateAdminJob(editingId, payload, uploads)
        : await createAdminJob(payload, uploads);
      if (editingId) setEditingId(saved.id);
      else {
        setEditingId(saved.id);
      }
      setForm(toJobForm(saved));
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (notificationPreview) URL.revokeObjectURL(notificationPreview);
      setLogoFile(null); setLogoPreview(""); setNotificationPdf(null); setNotificationPreview("");
      setMessage(status === "draft" ? "Draft saved; it is not visible to visitors." : `Job ${status === "closed" ? "marked closed" : "published"} successfully.`);
      reload();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const deleteJob = async (job) => {
    if (!window.confirm(`Delete "${job.title}" at ${job.companyName}? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await deleteAdminJob(job.id);
      if (editingId === job.id) startNew();
      setMessage("Job listing deleted.");
      reload();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const quickUpdate = async (job, updates) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const current = await getAdminJob(job.id);
      await updateAdminJob(
        job.id,
        toJobPayload(toJobForm({ ...current, ...updates }), updates.status || current.status),
        { keepLogoId: current.companyLogoUploadId, keepNotificationFileId: current.notificationFile?.id }
      );
      setMessage("Job listing updated.");
      reload();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const selectLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setError("Choose a JPG, PNG, or WebP logo no larger than 10 MB.");
      event.target.value = "";
      return;
    }
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setForm((current) => ({ ...current, companyLogoUrl: "" }));
    setError("");
  };
  const selectNotification = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if ((file.type && file.type !== "application/pdf") || !file.name.toLowerCase().endsWith(".pdf") || file.size > 25 * 1024 * 1024) {
      setError("Choose an official PDF notification no larger than 25 MB.");
      event.target.value = "";
      return;
    }
    if (notificationPreview) URL.revokeObjectURL(notificationPreview);
    setNotificationPdf(file);
    setNotificationPreview(URL.createObjectURL(file));
    setError("");
  };
  const removeLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(null); setLogoPreview("");
    setForm((current) => ({ ...current, companyLogoName: "", companyLogoUploadId: "", companyLogoUploadUrl: "", companyLogoUrl: "" }));
  };
  const removeNotification = () => {
    if (notificationPreview) URL.revokeObjectURL(notificationPreview);
    setNotificationPdf(null); setNotificationPreview("");
    setForm((current) => ({ ...current, notificationFile: null }));
  };

  return (
    <main className="jobs-admin">
      <div className="jobs-admin__container">
        <header className="jobs-admin__heading">
          <div>
            <span className="jobs-admin__eyebrow">ADMIN · CAREER UPDATES</span>
            <h1>Job notifications</h1>
            <p>Publish only opportunities checked against an official source.</p>
          </div>
          <div className="jobs-admin__heading-actions">
            <Link to="/career-jobs" className="jobs-admin__button jobs-admin__button--quiet" target="_blank" rel="noreferrer"><ExternalLink size={16} /> View public page</Link>
            <button type="button" className="jobs-admin__button" onClick={startNew}><Plus size={17} /> New job</button>
            <button type="button" className="jobs-admin__icon-button" aria-label="Refresh jobs" onClick={reload}><RefreshCw size={17} /></button>
          </div>
        </header>

        {error && <p className="jobs-admin__notice jobs-admin__notice--error" role="alert">{error}</p>}
        {message && <p className="jobs-admin__notice" role="status">{message}</p>}

        <section className="jobs-admin__stats" aria-label="Job listing totals">
          {[["All listings", dashboard.total], ["Drafts", dashboard.drafts], ["Open", dashboard.open], ["Closed", dashboard.closed], ["Featured", dashboard.featured]].map(([label, value]) => (
            <article key={label}><span>{label}</span><strong>{value}</strong></article>
          ))}
        </section>

        <div className="jobs-admin__layout">
          <section className="jobs-admin__list-panel" aria-label="Manage jobs">
            <div className="jobs-admin__list-heading"><div><span className="jobs-admin__eyebrow">JOB LIBRARY</span><h2>Manage listings</h2></div><span>{results.total} total</span></div>
            <div className="jobs-admin__filters">
              <label><span className="jobs-admin__sr-only">Search jobs</span><input placeholder="Search title, company, skill…" value={filters.q} onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, q: event.target.value })); }} /></label>
              <label><span className="jobs-admin__sr-only">Filter by status</span>
                <select value={filters.status} onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, status: event.target.value })); }}>
                  <option value="">All statuses</option><option value="draft">Draft</option><option value="open">Open</option><option value="closed">Closed</option>
                </select>
              </label>
            </div>
            {loading && <p className="jobs-admin__state" role="status">Loading job listings…</p>}
            {!loading && results.items.length === 0 && <div className="jobs-admin__empty"><BriefcaseBusiness size={28} /><strong>No job listings found.</strong><span>Create a draft, then publish it after verifying the official source.</span></div>}
            {!loading && results.items.length > 0 && (
              <div className="jobs-admin__table-wrap">
                <table>
                  <thead><tr><th>Job</th><th>Status</th><th>Deadline</th><th>Actions</th></tr></thead>
                  <tbody>
                    {results.items.map((job) => (
                      <tr key={job.id}>
                        <td><strong>{job.title}</strong><span>{job.companyName} · {job.categoryName}</span></td>
                        <td><span className={`jobs-admin__status jobs-admin__status--${job.status}`}>{getStatusLabel(job.status)}</span></td>
                        <td>{displayDate(job.applicationDeadline)}</td>
                        <td>
                          <div className="jobs-admin__row-actions">
                            <button type="button" title={job.featured ? "Remove featured status" : "Feature job"} disabled={busy} onClick={() => quickUpdate(job, { featured: !job.featured })}><Star size={16} fill={job.featured ? "currentColor" : "none"} /></button>
                            <button type="button" title="Edit job" disabled={busy} onClick={() => editJob(job)}><Pencil size={16} /></button>
                            {job.status !== "draft" && <Link to={`/career-jobs/${encodeURIComponent(job.slug)}`} title="Preview public job" target="_blank" rel="noreferrer"><Eye size={16} /></Link>}
                            <button type="button" title={job.status === "draft" ? "Publish job" : "Unpublish to draft"} disabled={busy} onClick={() => quickUpdate(job, { status: job.status === "draft" ? "open" : "draft" })}>{job.status === "draft" ? <Check size={16} /> : <X size={16} />}</button>
                            <button type="button" title="Delete job" disabled={busy} onClick={() => deleteJob(job)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {results.pages > 1 && <nav className="jobs-admin__pagination" aria-label="Admin job pages">
              <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={16} /> Previous</button>
              <span>Page {results.page} of {results.pages}</span>
              <button type="button" disabled={page >= results.pages || loading} onClick={() => setPage((value) => value + 1)}>Next <ChevronRight size={16} /></button>
            </nav>}
          </section>

          <JobEditor
            form={form}
            categories={categories}
            loadingJob={loadingJob}
            busy={busy}
            logoFile={logoFile}
            logoPreview={logoPreview}
            notificationPdf={notificationPdf}
            notificationPreview={notificationPreview}
            onLogoChange={selectLogo}
            onNotificationChange={selectNotification}
            onRemoveLogo={removeLogo}
            onRemoveNotification={removeNotification}
            editing={Boolean(editingId)}
            onChange={setForm}
            onSave={saveJob}
            onCancel={startNew}
          />
        </div>
      </div>
    </main>
  );
}
