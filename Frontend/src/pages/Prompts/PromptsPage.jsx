import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Copy, FileText, Search, Sparkles } from "lucide-react";
import { apiUrl } from "../../utils/api";
import { getPublicPrompt, getPublicPromptCategories, getPublicPrompts } from "./promptsApi";
import "./PromptsPage.css";

const PAGE_SIZE = 12;

function PromptCopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setError("");
      window.setTimeout(() => setCopied(false), 1800);
    } catch (copyError) {
      setError(`Could not copy: ${copyError.message || "Clipboard access is unavailable."}`);
    }
  };
  return <span className="public-prompts__copy-wrap"><button className="public-prompts__button public-prompts__button--quiet" type="button" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : label}</button>{error && <small role="alert">{error}</small>}</span>;
}

function PromptCard({ prompt }) {
  return (
    <article className="public-prompts__card">
      <Link className="public-prompts__card-image" to={`/prompts/${encodeURIComponent(prompt.promptId)}`}>
        {prompt.coverImage ? <img src={apiUrl(prompt.coverImage.url)} alt="" loading="lazy" /> : <span><Sparkles size={30} /></span>}
        {prompt.featured && <b>Featured</b>}
      </Link>
      <div className="public-prompts__card-content">
        <div className="public-prompts__meta"><span>{prompt.category.name}</span><span>{prompt.difficulty}</span></div>
        <h2><Link to={`/prompts/${encodeURIComponent(prompt.promptId)}`}>{prompt.title}</Link></h2>
        <p>{prompt.description}</p>
        <div className="public-prompts__tags">{prompt.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="public-prompts__card-footer"><code>{prompt.promptId}</code><Link to={`/prompts/${encodeURIComponent(prompt.promptId)}`}>View prompt <ArrowRight size={15} /></Link></div>
      </div>
    </article>
  );
}

function PromptListing() {
  const [query, setQuery] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState({ items: [], page: 1, pages: 0, total: 0 });
  const [q, setQ] = useState(query.get("q") || "");
  const [category, setCategory] = useState(query.get("category") || "");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPublicPromptCategories().then((items) => { if (active) setCategories(items); }).catch((loadError) => { if (active) setError(loadError.message); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const result = await getPublicPrompts({ q, category, page, limit: PAGE_SIZE });
        if (active) { setResults(result); setError(""); }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    }, q ? 250 : 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [q, category, page]);

  const updateQuery = (nextQ, nextCategory) => {
    setQ(nextQ);
    setCategory(nextCategory);
    setPage(1);
    const params = {};
    if (nextQ) params.q = nextQ;
    if (nextCategory) params.category = nextCategory;
    setQuery(params, { replace: true });
  };

  return (
    <main className="public-prompts">
      <header className="public-prompts__hero">
        <div className="public-prompts__hero-inner">
          <span className="public-prompts__eyebrow"><Sparkles size={15} />THE 360° VERTEX PROMPT LIBRARY</span>
          <h1>Better prompts.<br /><span>More useful AI.</span></h1>
          <p>Explore practical, reusable prompts for the AI tools you use. Copy a prompt, customize its placeholders, and make it yours.</p>
          <form className="public-prompts__search" onSubmit={(event) => event.preventDefault()}>
            <Search size={19} />
            <input aria-label="Search prompts by title, keyword, category, or prompt ID" placeholder="Search prompts or enter a prompt ID…" value={q} onChange={(event) => updateQuery(event.target.value, category)} />
            <select aria-label="Filter prompt category" value={category} onChange={(event) => updateQuery(q, event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          </form>
        </div>
      </header>
      <section className="public-prompts__listing">
        <div className="public-prompts__listing-heading"><div><span className="public-prompts__eyebrow">CURATED PROMPTS</span><h2>Explore the library</h2></div><span>{results.total} {results.total === 1 ? "prompt" : "prompts"}</span></div>
        {error && <div className="public-prompts__state public-prompts__state--error" role="alert"><strong>Prompts couldn’t be loaded.</strong><span>{error}</span><button type="button" onClick={() => setPage((current) => current)}>Try again</button></div>}
        {loading && <p className="public-prompts__state" role="status">Loading prompts…</p>}
        {!loading && !error && results.items.length === 0 && <div className="public-prompts__state"><Sparkles size={28} /><h2>No prompts match your search</h2><p>Try another keyword or category, or check back later for newly published prompts.</p></div>}
        {!error && results.items.length > 0 && <div className="public-prompts__grid">{results.items.map((prompt) => <PromptCard key={prompt.promptId} prompt={prompt} />)}</div>}
        {results.pages > 1 && <nav className="public-prompts__pagination" aria-label="Prompt pages"><button type="button" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)}><ArrowLeft size={16} />Previous</button><span>Page {results.page} of {results.pages}</span><button type="button" disabled={page >= results.pages || loading} onClick={() => setPage((current) => current + 1)}>Next<ArrowRight size={16} /></button></nav>}
      </section>
    </main>
  );
}

function PromptDetail({ promptId }) {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setPrompt(await getPublicPrompt(promptId));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [promptId]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!prompt) return undefined;
    const originalTitle = document.title;
    document.title = `${prompt.title} (${prompt.promptId}) | AI Prompts`;
    return () => { document.title = originalTitle; };
  }, [prompt]);

  if (loading) return <main className="public-prompts__detail"><p className="public-prompts__state" role="status">Loading prompt…</p></main>;
  if (error || !prompt) return <main className="public-prompts__detail"><Link className="public-prompts__back" to="/prompts"><ArrowLeft size={16} />All prompts</Link><div className="public-prompts__state public-prompts__state--error" role="alert">{error || "Prompt not found."}</div></main>;

  return (
    <main className="public-prompts__detail">
      <Link className="public-prompts__back" to="/prompts"><ArrowLeft size={16} />All prompts</Link>
      <article className="public-prompts__detail-card">
        {prompt.coverImage && <img className="public-prompts__detail-cover" src={apiUrl(prompt.coverImage.url)} alt="" />}
        <div className="public-prompts__meta"><span>{prompt.category.name}</span><span>{prompt.difficulty}</span>{prompt.featured && <span>Featured</span>}</div>
        <h1>{prompt.title}</h1>
        <p className="public-prompts__description">{prompt.description}</p>
        <div className="public-prompts__identity"><span>Prompt ID</span><code>{prompt.promptId}</code><PromptCopyButton value={prompt.promptId} label="Copy ID" /></div>
        {prompt.aiTools.length > 0 && <section className="public-prompts__tools"><h2>Works with</h2><div className="public-prompts__tags">{prompt.aiTools.map((tool) => <span key={tool}>{tool}</span>)}</div></section>}
        {prompt.tags.length > 0 && <div className="public-prompts__tags public-prompts__tags--detail">{prompt.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        <section className="public-prompts__full-prompt"><div><h2>Full prompt</h2><PromptCopyButton value={prompt.promptText} label="Copy full prompt" /></div><pre>{prompt.promptText}</pre></section>
        {(prompt.exampleImages.length > 0 || prompt.externalExampleImageUrl) && <section className="public-prompts__examples"><h2>Example output</h2><div>{prompt.exampleImages.map((image) => <img key={image.id} src={apiUrl(image.url)} alt={image.name || "Example prompt output"} loading="lazy" />)}{prompt.externalExampleImageUrl && <img src={prompt.externalExampleImageUrl} alt="External example output" loading="lazy" />}</div></section>}
        {prompt.videos?.length > 0 && <section className="public-prompts__attachments"><h2>Prompt videos</h2>{prompt.videos.map((video) => <video key={video.id} src={apiUrl(video.url)} controls preload="metadata"><a href={apiUrl(video.url)}>Play {video.name}</a></video>)}</section>}
        {prompt.documents?.length > 0 && <section className="public-prompts__attachments"><h2>PDF resources</h2><ul>{prompt.documents.map((document) => <li key={document.id}><a href={apiUrl(document.url)} target="_blank" rel="noreferrer"><FileText size={16} />{document.name}</a></li>)}</ul></section>}
        {prompt.generateImage && !prompt.imageGenerationAvailable && <p className="public-prompts__provider-note">Image generation for this prompt is not currently available because an image provider has not been configured.</p>}
      </article>
    </main>
  );
}

export default function PromptsPage() {
  const { promptId } = useParams();
  return promptId ? <PromptDetail key={promptId} promptId={promptId} /> : <PromptListing />;
}
