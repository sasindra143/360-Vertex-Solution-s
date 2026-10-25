import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { ChevronLeft, ChevronRight, FileText, Search } from "lucide-react";
import { getPublicCategories, getPublicNote, getPublicNotes } from "../Admin/mediaNotesStorage";
import { apiUrl } from "../../utils/api";
import "./StudentNotesPage.css";

const PAGE_SIZE = 9;
const SAFE_RICH_TEXT_TAGS = [
  "h2", "h3", "h4", "p", "strong", "b", "em", "i", "u", "s",
  "ul", "ol", "li", "blockquote", "pre", "code", "hr",
  "table", "thead", "tbody", "tr", "th", "td", "a",
];
const SAFE_RICH_TEXT_ATTRS = ["href", "target", "rel"];

function usePageMetadata(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.content;
    document.title = title;
    if (meta) meta.content = description || "";
    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [title, description]);
}

function NoteCard({ note }) {
  const cover = note.coverImage || note.blocks.find((block) => block.type === "image")?.attachment;
  return (
    <article className="student-notes__card">
      <Link className="student-notes__card-link" to={`/students/notes/${encodeURIComponent(note.slug)}`}>
        {cover
          ? <img className="student-notes__cover" src={apiUrl(cover.url)} alt={note.coverImageAlt || note.title} loading="lazy" />
          : <div className="student-notes__cover student-notes__cover--empty"><FileText size={34} /></div>}
        <div className="student-notes__card-content">
          <div className="student-notes__card-meta">
            <span>{note.category?.name || "Learning resource"}</span>
            {note.publishedAt && <time dateTime={note.publishedAt}>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(note.publishedAt))}</time>}
          </div>
          <h2>{note.title}</h2>
          <p>{note.summary}</p>
          {note.tags?.length > 0 && (
            <ul className="student-notes__tags" aria-label="Note tags">
              {note.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
          <span className="student-notes__read-more">Read note <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}

function NotesIndex() {
  const [notes, setNotes] = useState({ items: [], page: 1, pages: 0, total: 0 });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ q: "", category: "", tag: "", sort: "newest" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  usePageMetadata("Notes & Resources | Vertex", "Browse published notes, study resources, and learning guides.");

  useEffect(() => {
    let active = true;
    getPublicCategories()
      .then((result) => { if (active) setCategories(result); })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const result = await getPublicNotes({ ...filters, page, limit: PAGE_SIZE });
        if (active) {
          setNotes(result);
          setError("");
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
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

  return (
    <main className="student-notes">
      <div className="student-notes__container">
        <header className="student-notes__header">
          <span className="student-notes__eyebrow">STUDENT LEARNING HUB</span>
          <h1>Notes &amp; Resources</h1>
          <p>Browse published learning notes, visual guides, and downloadable resources.</p>
        </header>
        <div className="student-notes__filters">
          <label className="student-notes__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search published notes</span>
            <input placeholder="Search notes" value={filters.q} onChange={(event) => setFilter("q", event.target.value)} />
          </label>
          <label><span className="sr-only">Filter by category</span>
            <select value={filters.category} onChange={(event) => setFilter("category", event.target.value)}>
              <option value="">All categories</option>
              {categories.map((category) => <option value={category.slug} key={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label><span className="sr-only">Filter by tag</span>
            <input placeholder="Tag" value={filters.tag} onChange={(event) => setFilter("tag", event.target.value)} />
          </label>
          <label><span className="sr-only">Sort published notes</span>
            <select value={filters.sort} onChange={(event) => setFilter("sort", event.target.value)}>
              <option value="newest">Newest</option><option value="oldest">Oldest</option><option value="title">Title A-Z</option>
            </select>
          </label>
        </div>

        {error && <p className="student-notes__state student-notes__state--error" role="alert">{error}</p>}
        {loading && <p className="student-notes__state" role="status">Loading published notes…</p>}
        {!loading && !error && notes.items.length === 0 && <p className="student-notes__state">No published notes match your search.</p>}
        {!loading && notes.items.length > 0 && (
          <>
            <p className="student-notes__count">{notes.total} {notes.total === 1 ? "note" : "notes"}</p>
            <section className="student-notes__grid" aria-label="Published notes">
              {notes.items.map((note) => <NoteCard key={note.id} note={note} />)}
            </section>
            {notes.pages > 1 && (
              <nav className="student-notes__pagination" aria-label="Notes pages">
                <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={18} /> Previous</button>
                <span>Page {notes.page} of {notes.pages}</span>
                <button type="button" disabled={page >= notes.pages || loading} onClick={() => setPage((value) => value + 1)}>Next <ChevronRight size={18} /></button>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function SafeRichText({ html }) {
  return (
    <div
      className="student-notes__rich-text"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html || "", {
          ALLOWED_TAGS: SAFE_RICH_TEXT_TAGS,
          ALLOWED_ATTR: SAFE_RICH_TEXT_ATTRS,
        }),
      }}
    />
  );
}

function ContentBlock({ block }) {
  if (block.type === "richText") return <SafeRichText html={block.html} />;
  if (block.type === "heading") {
    const Heading = block.level === "h3" ? "h3" : "h2";
    return <Heading className="student-notes__section-heading">{block.text}</Heading>;
  }
  if (block.type === "image" && block.attachment) {
    return (
      <figure className="student-notes__figure">
        <img src={apiUrl(block.attachment.url)} alt={block.alt || ""} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "gallery") {
    return (
      <figure className="student-notes__gallery-block">
        <div className="student-notes__gallery">
          {(block.attachments || []).map((image) => (
            <img key={image.id} src={apiUrl(image.url)} alt={image.name || "Note illustration"} loading="lazy" />
          ))}
        </div>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "video") {
    const videoUrl = block.embedUrl;
    let safeEmbed = false;
    try {
      const parsed = new URL(videoUrl);
      safeEmbed = parsed.protocol === "https:"
        && ["www.youtube-nocookie.com", "player.vimeo.com"].includes(parsed.hostname);
    } catch {
      safeEmbed = false;
    }
    return (
      <figure className="student-notes__video">
        {block.attachment
          ? <video src={apiUrl(block.attachment.url)} controls preload="metadata" />
          : safeEmbed
            ? <iframe src={videoUrl} title={block.caption || "Learning video"} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            : <p>Video is unavailable.</p>}
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "document" && block.attachment) {
    return (
      <a className="student-notes__document" href={apiUrl(block.attachment.url)} target="_blank" rel="noreferrer">
        <FileText size={20} aria-hidden="true" />
        <span>{block.label || block.attachment.name}<small>{block.attachment.name} · {Math.ceil(block.attachment.size / 1024)} KB</small></span>
        <span aria-hidden="true">Download</span>
      </a>
    );
  }
  if (block.type === "callout") {
    return <aside className={`student-notes__callout student-notes__callout--${block.tone || "info"}`}>{block.text}</aside>;
  }
  if (block.type === "link") {
    if (typeof block.url !== "string" || !URL.canParse(block.url)) return null;
    const url = new URL(block.url);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return <p className="student-notes__external-link"><a href={url.href} target="_blank" rel="noopener noreferrer nofollow">{block.label || "Open resource"} <span aria-hidden="true">↗</span></a></p>;
  }
  return null;
}

function NoteDetail({ slug }) {
  const [note, setNote] = useState(null);
  const [loadedSlug, setLoadedSlug] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPublicNote(slug)
      .then((result) => {
        if (active) {
          setNote(result);
          setError("");
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoadedSlug(slug); });
    return () => { active = false; };
  }, [slug]);

  const loading = loadedSlug !== slug;
  usePageMetadata(
    note ? `${note.seoTitle || note.title} | Vertex` : "Learning note | Vertex",
    note?.seoDescription || note?.summary || "Learning notes and resources."
  );

  if (loading) return <main className="student-notes"><p className="student-notes__state" role="status">Loading note…</p></main>;
  return (
    <main className="student-notes student-notes--detail">
      <article className="student-notes__article">
        <Link className="student-notes__back" to="/students/notes"><ChevronLeft size={17} /> All notes</Link>
        {error || !note
          ? <p className="student-notes__state student-notes__state--error" role="alert">{error || "This note is unavailable. It may be unpublished or the link is invalid."}</p>
          : (
            <>
              <header className="student-notes__article-header">
                <span className="student-notes__eyebrow">{note.category?.name || "Learning resource"}</span>
                <h1>{note.title}</h1>
                <p>{note.summary}</p>
                <div className="student-notes__article-meta">
                  {note.publishedAt && <time dateTime={note.publishedAt}>{new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(note.publishedAt))}</time>}
                  {note.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </header>
              {note.coverImage && <img className="student-notes__article-cover" src={apiUrl(note.coverImage.url)} alt={note.coverImageAlt || note.title} />}
              <div className="student-notes__article-content">
                {note.blocks.map((block) => <ContentBlock key={block.id} block={block} />)}
              </div>
            </>
          )}
      </article>
    </main>
  );
}

export default function StudentNotesPage() {
  const { noteSlug } = useParams();
  return noteSlug ? <NoteDetail slug={noteSlug} /> : <NotesIndex />;
}
