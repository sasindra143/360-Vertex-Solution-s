import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import DOMPurify from "dompurify";
import { ArrowDown, ArrowLeft, ArrowUp, Eye, ImagePlus, Plus, Save, Trash2, Upload, X } from "lucide-react";
import {
  createAdminNote,
  getAdminCategories,
  getAdminNote,
  updateAdminNote,
  uploadNoteMedia,
} from "./mediaNotesStorage";
import { apiUrl } from "../../utils/api";
import "./AdminMediaNotes.css";

const NEW_BLOCKS = {
  richText: () => ({ id: crypto.randomUUID(), type: "richText", html: "<p></p>" }),
  heading: () => ({ id: crypto.randomUUID(), type: "heading", text: "", level: "h2" }),
  image: () => ({ id: crypto.randomUUID(), type: "image", attachment: null, alt: "", caption: "" }),
  gallery: () => ({ id: crypto.randomUUID(), type: "gallery", attachments: [], caption: "" }),
  video: () => ({ id: crypto.randomUUID(), type: "video", url: "", attachment: null, caption: "" }),
  document: () => ({ id: crypto.randomUUID(), type: "document", attachment: null, label: "" }),
  callout: () => ({ id: crypto.randomUUID(), type: "callout", text: "", tone: "info" }),
  link: () => ({ id: crypto.randomUUID(), type: "link", url: "", label: "" }),
};

const BLOCK_LABELS = {
  richText: "Rich text",
  heading: "Section heading",
  image: "Image",
  gallery: "Image gallery",
  video: "Video",
  document: "Downloadable file",
  callout: "Callout",
  link: "Link",
};

function createEmptyNote(categoryId = "") {
  return {
    title: "",
    slug: "",
    summary: "",
    categoryId,
    tags: [],
    coverImage: null,
    coverImageAlt: "",
    blocks: [NEW_BLOCKS.richText()],
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  };
}

function slugify(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
}

function RichTextBlock({ block, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "nofollow noopener noreferrer", target: "_blank" },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: block.html || "<p></p>",
    onUpdate: ({ editor: activeEditor }) => onChangeRef.current({ ...block, html: activeEditor.getHTML() }),
  }, [block.id]);

  if (!editor) return <p className="notes-editor__hint">Preparing rich-text editor…</p>;

  const setLink = () => {
    const current = editor.getAttributes("link").href || "";
    const value = window.prompt("Enter a secure HTTPS link", current);
    if (value === null) return;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("Use a valid HTTPS URL.");
      editor.chain().focus().extendMarkRange("link").setLink({ href: url.href }).run();
    } catch (error) {
      window.alert(error.message || "Use a valid HTTPS URL.");
    }
  };

  const tools = [
    ["Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold")],
    ["Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic")],
    ["H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 })],
    ["H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 })],
    ["H4", () => editor.chain().focus().toggleHeading({ level: 4 }).run(), editor.isActive("heading", { level: 4 })],
    ["List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList")],
    ["Numbered", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList")],
    ["Quote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote")],
    ["Code", () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive("codeBlock")],
    ["Link", setLink, editor.isActive("link")],
    ["Table", () => editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run(), false],
    ["Rule", () => editor.chain().focus().setHorizontalRule().run(), false],
  ];

  return (
    <div className="notes-editor__richtext">
      <div className="notes-editor__toolbar" role="toolbar" aria-label="Rich text formatting">
        {tools.map(([label, action, active]) => (
          <button className={active ? "is-active" : ""} type="button" key={label} onClick={action}>{label}</button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function AttachmentPreview({ attachment, label }) {
  if (!attachment) return <p className="notes-editor__hint">No file selected.</p>;
  const source = apiUrl(attachment.url);
  if (attachment.contentType?.startsWith("image/")) {
    return <img className="notes-editor__attachment-image" src={source} alt={attachment.name || label || "Uploaded image"} />;
  }
  if (attachment.contentType?.startsWith("video/")) {
    return <video className="notes-editor__attachment-video" src={source} controls preload="metadata" />;
  }
  return <a className="notes-editor__file-link" href={source} target="_blank" rel="noreferrer">{attachment.name || label || "Open uploaded file"}</a>;
}

export default function AdminNoteEditor() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(createEmptyNote());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [nextCategories, savedNote] = await Promise.all([
          getAdminCategories(),
          noteId ? getAdminNote(noteId) : Promise.resolve(null),
        ]);
        if (!active) return;
        setCategories(nextCategories);
        if (savedNote) {
          setNote({
            ...savedNote,
            categoryId: savedNote.category?.id || "",
            blocks: savedNote.blocks || [],
            tags: savedNote.tags || [],
          });
          setTagsInput((savedNote.tags || []).join(", "));
          setSlugTouched(true);
        } else {
          setNote(createEmptyNote(nextCategories[0]?.id || ""));
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [noteId]);

  const updateNote = (patch) => setNote((current) => ({ ...current, ...patch }));

  const addBlock = (type, insertIndex = note.blocks.length) => {
    const blocks = [...note.blocks];
    blocks.splice(insertIndex, 0, NEW_BLOCKS[type]());
    updateNote({ blocks });
    setMessage("");
  };

  const updateBlock = (id, patch) => {
    updateNote({ blocks: note.blocks.map((block) => block.id === id ? { ...block, ...patch } : block) });
  };

  const moveBlock = (id, offset) => {
    const index = note.blocks.findIndex((block) => block.id === id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= note.blocks.length) return;
    const blocks = [...note.blocks];
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    updateNote({ blocks });
  };

  const uploadFor = async (file, callback) => {
    if (!file) return;
    const maxBytes = file.type.startsWith("image/") ? 10 * 1024 * 1024
      : file.type.startsWith("video/") ? 20 * 1024 * 1024
        : 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      const mediaType = file.type.startsWith("image/") ? "Images" : file.type.startsWith("video/") ? "Videos" : "Documents";
      setError(`${mediaType} must be ${Math.floor(maxBytes / 1024 / 1024)} MB or smaller.`);
      return;
    }
    setUploading(true);
    setError("");
    try {
      callback(await uploadNoteMedia(file));
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async (status) => {
    setSaving(true);
    setError("");
    setMessage("");
    const payload = {
      ...note,
      slug: note.slug || slugify(note.title),
      categoryId: note.categoryId || categories[0]?.id || "",
      tags: tagsInput.split(",").map((tag) => tag.trim()).filter(Boolean),
      status,
    };
    try {
      const saved = noteId
        ? await updateAdminNote(noteId, payload)
        : await createAdminNote(payload);
      setMessage(status === "published" ? "Note published successfully." : "Draft saved successfully.");
      navigate("/admin/media-notes", { replace: true, state: { message: status === "published" ? "Note published." : "Draft saved." } });
      return saved;
    } catch (saveError) {
      setError(saveError.message);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save(note.status || "draft");
  };

  const editorPreview = (block) => (
    <div className="notes-editor__live-preview" key={`${block.id}-preview`}>
      <span>Preview</span>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.html || "") }} />
    </div>
  );

  if (loading) {
    return <main className="notes-admin"><p className="notes-admin__state" role="status">Loading editor…</p></main>;
  }

  return (
    <main className="notes-admin">
      <div className="notes-admin__container notes-editor">
        <Link className="notes-editor__back" to="/admin/media-notes"><ArrowLeft size={17} /> Back to notes</Link>
        <header className="notes-admin__heading">
          <div>
            <span className="notes-admin__eyebrow">{noteId ? "EDIT NOTE" : "NEW NOTE"}</span>
            <h1>{noteId ? "Edit learning note" : "Create a learning note"}</h1>
            <p>Draft privately, preview the content, and publish when it is ready.</p>
          </div>
          <span className={`notes-admin__status notes-admin__status--${note.status}`}>{note.status}</span>
        </header>

        {error && <p className="notes-admin__notice notes-admin__notice--error" role="alert">{error}</p>}
        {message && <p className="notes-admin__notice" role="status">{message}</p>}

        <form className="notes-editor__layout" onSubmit={handleSubmit}>
          <div className="notes-editor__main">
            <section className="notes-editor__panel" aria-labelledby="note-content-heading">
              <h2 id="note-content-heading">Note content</h2>
              <label className="notes-editor__field">
                Title
                <input value={note.title} maxLength={160} required onChange={(event) => {
                  const title = event.target.value;
                  setNote((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) }));
                }} />
              </label>
              <label className="notes-editor__field">
                URL slug
                <input value={note.slug} maxLength={100} required onChange={(event) => {
                  setSlugTouched(true);
                  updateNote({ slug: slugify(event.target.value) });
                }} />
                <small>Public URL: /students/notes/{note.slug || "your-note-slug"}</small>
              </label>
              <label className="notes-editor__field">
                Summary
                <textarea value={note.summary} maxLength={500} rows={3} placeholder="A short introduction shown in note lists" onChange={(event) => updateNote({ summary: event.target.value })} />
                <small>{note.summary.length}/500 characters</small>
              </label>
              <div className="notes-editor__field">
                <span>Cover image</span>
                <label className="notes-admin__button notes-admin__button--quiet notes-editor__upload">
                  <ImagePlus size={17} /> Choose cover image
                  <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={(event) => uploadFor(event.target.files?.[0], (coverImage) => updateNote({ coverImage }))} />
                </label>
                {note.coverImage && (
                  <div className="notes-editor__cover">
                    <AttachmentPreview attachment={note.coverImage} label="Cover image" />
                    <button type="button" aria-label="Remove cover image" onClick={() => updateNote({ coverImage: null, coverImageAlt: "" })}><X size={17} /></button>
                  </div>
                )}
                {note.coverImage && <label className="notes-editor__field">Cover image alt text<input value={note.coverImageAlt || ""} maxLength={300} onChange={(event) => updateNote({ coverImageAlt: event.target.value })} /></label>}
                <small>Images up to 20 MB; stored as media files, not in the note document.</small>
              </div>
            </section>

            <section className="notes-editor__panel" aria-labelledby="note-blocks-heading">
              <div className="notes-editor__section-heading">
                <div><h2 id="note-blocks-heading">Content blocks</h2><p>Arrange text, images, videos, files, and links in the order students should see them.</p></div>
              </div>
              <div className="notes-editor__add-blocks" aria-label="Add a content block">
                {Object.entries(BLOCK_LABELS).map(([type, label]) => (
                  <button type="button" key={type} onClick={() => addBlock(type)}><Plus size={15} /> Add {label.toLowerCase()}</button>
                ))}
              </div>

              {note.blocks.map((block, index) => (
                <Fragment key={block.id}>
                <article className="notes-editor__block">
                  <header>
                    <strong>{index + 1}. {BLOCK_LABELS[block.type] || block.type}</strong>
                    <div>
                      <button type="button" aria-label={`Move block ${index + 1} up`} disabled={index === 0} onClick={() => moveBlock(block.id, -1)}><ArrowUp size={16} /></button>
                      <button type="button" aria-label={`Move block ${index + 1} down`} disabled={index === note.blocks.length - 1} onClick={() => moveBlock(block.id, 1)}><ArrowDown size={16} /></button>
                      <button type="button" aria-label={`Remove block ${index + 1}`} onClick={() => updateNote({ blocks: note.blocks.filter((item) => item.id !== block.id) })}><Trash2 size={16} /></button>
                    </div>
                  </header>

                  {block.type === "richText" && (
                    <>
                      <RichTextBlock block={block} onChange={(updated) => updateBlock(block.id, updated)} />
                      {editorPreview(block)}
                    </>
                  )}
                  {block.type === "heading" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-editor__field">Section title
                        <input required maxLength={240} value={block.text || ""} placeholder="For example, How does retrieval work?" onChange={(event) => updateBlock(block.id, { text: event.target.value })} />
                      </label>
                      <label className="notes-editor__field">Heading level
                        <select value={block.level || "h2"} onChange={(event) => updateBlock(block.id, { level: event.target.value })}>
                          <option value="h2">Section (H2)</option><option value="h3">Subsection (H3)</option>
                        </select>
                      </label>
                    </div>
                  )}
                  {block.type === "image" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-admin__button notes-admin__button--quiet notes-editor__upload">
                        <Upload size={16} /> {block.attachment ? "Replace image" : "Upload image"}
                        <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={(event) => uploadFor(event.target.files?.[0], (attachment) => updateBlock(block.id, { attachment }))} />
                      </label>
                      <AttachmentPreview attachment={block.attachment} label="Image" />
                      <label className="notes-editor__field">Alt text<input value={block.alt || ""} maxLength={300} onChange={(event) => updateBlock(block.id, { alt: event.target.value })} /></label>
                      <label className="notes-editor__field">Caption<input value={block.caption || ""} maxLength={500} onChange={(event) => updateBlock(block.id, { caption: event.target.value })} /></label>
                    </div>
                  )}
                  {block.type === "gallery" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-admin__button notes-admin__button--quiet notes-editor__upload">
                        <ImagePlus size={16} /> Add gallery images
                        <input type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp" onChange={async (event) => {
                          const selected = Array.from(event.target.files || []);
                          for (const file of selected) {
                            await uploadFor(file, (attachment) => updateBlock(block.id, {
                              attachments: [...(block.attachments || []), attachment],
                            }));
                          }
                          event.target.value = "";
                        }} />
                      </label>
                      <div className="notes-editor__gallery">
                        {(block.attachments || []).map((attachment) => (
                          <div key={attachment.id}>
                            <AttachmentPreview attachment={attachment} />
                            <button type="button" aria-label={`Remove ${attachment.name}`} onClick={() => updateBlock(block.id, {
                              attachments: block.attachments.filter((item) => item.id !== attachment.id),
                            })}><X size={15} /></button>
                          </div>
                        ))}
                      </div>
                      <label className="notes-editor__field">Gallery caption<input value={block.caption || ""} maxLength={500} onChange={(event) => updateBlock(block.id, { caption: event.target.value })} /></label>
                    </div>
                  )}
                  {block.type === "video" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-editor__field">YouTube or Vimeo URL<input type="url" value={block.url || ""} placeholder="https://youtu.be/…" onChange={(event) => updateBlock(block.id, { url: event.target.value, attachment: null })} /></label>
                      <span className="notes-editor__hint">Only YouTube and Vimeo embeds are shown publicly. A supported MP4/WebM upload is also available:</span>
                      <label className="notes-admin__button notes-admin__button--quiet notes-editor__upload">
                        <Upload size={16} /> Upload video
                        <input type="file" accept="video/mp4,video/webm,.mp4,.webm" onChange={(event) => uploadFor(event.target.files?.[0], (attachment) => updateBlock(block.id, { attachment, url: "" }))} />
                      </label>
                      <AttachmentPreview attachment={block.attachment} />
                      <label className="notes-editor__field">Caption<input value={block.caption || ""} maxLength={500} onChange={(event) => updateBlock(block.id, { caption: event.target.value })} /></label>
                    </div>
                  )}
                  {block.type === "document" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-admin__button notes-admin__button--quiet notes-editor__upload">
                        <Upload size={16} /> {block.attachment ? "Replace document" : "Upload PDF or Word file"}
                        <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => uploadFor(event.target.files?.[0], (attachment) => updateBlock(block.id, { attachment, label: attachment.name }))} />
                      </label>
                      <AttachmentPreview attachment={block.attachment} />
                      <label className="notes-editor__field">Link label<input value={block.label || ""} maxLength={200} onChange={(event) => updateBlock(block.id, { label: event.target.value })} /></label>
                    </div>
                  )}
                  {block.type === "callout" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-editor__field">Callout text<textarea value={block.text || ""} rows={3} maxLength={5000} onChange={(event) => updateBlock(block.id, { text: event.target.value })} /></label>
                      <label className="notes-editor__field">Style<select value={block.tone || "info"} onChange={(event) => updateBlock(block.id, { tone: event.target.value })}><option value="info">Information</option><option value="tip">Tip</option><option value="warning">Warning</option></select></label>
                    </div>
                  )}
                  {block.type === "link" && (
                    <div className="notes-editor__block-fields">
                      <label className="notes-editor__field">HTTPS URL<input type="url" value={block.url || ""} placeholder="https://example.com" onChange={(event) => updateBlock(block.id, { url: event.target.value })} /></label>
                      <label className="notes-editor__field">Link text<input value={block.label || ""} maxLength={200} onChange={(event) => updateBlock(block.id, { label: event.target.value })} /></label>
                    </div>
                  )}
                </article>
                <details className="notes-editor__insert-menu">
                  <summary><Plus size={15} /> Insert content after block {index + 1}</summary>
                  <div className="notes-editor__insert-options">
                    {Object.entries(BLOCK_LABELS).map(([type, label]) => (
                      <button type="button" key={type} onClick={() => addBlock(type, index + 1)}><Plus size={14} /> {label}</button>
                    ))}
                  </div>
                </details>
                </Fragment>
              ))}
              {note.blocks.length === 0 && <p className="notes-editor__empty-blocks">Add at least one content block before publishing.</p>}
            </section>

            <section className="notes-editor__panel" aria-labelledby="seo-heading">
              <h2 id="seo-heading">Search appearance</h2>
              <label className="notes-editor__field">SEO title<input value={note.seoTitle || ""} maxLength={160} onChange={(event) => updateNote({ seoTitle: event.target.value })} /></label>
              <label className="notes-editor__field">SEO description<textarea value={note.seoDescription || ""} maxLength={320} rows={2} onChange={(event) => updateNote({ seoDescription: event.target.value })} /></label>
            </section>
          </div>

          <aside className="notes-editor__sidebar">
            <section className="notes-editor__panel">
              <h2>Publish settings</h2>
              <label className="notes-editor__field">Category
                <select value={note.categoryId} required onChange={(event) => updateNote({ categoryId: event.target.value })}>
                  <option value="" disabled>Choose a category</option>
                  {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
                </select>
              </label>
              <label className="notes-editor__field">Tags <input value={tagsInput} placeholder="e.g. JavaScript, beginner" onChange={(event) => setTagsInput(event.target.value)} /></label>
              <p className="notes-editor__hint">Separate tags with commas. Up to 12 tags, 32 characters each.</p>
              <div className="notes-editor__save-actions">
                <button className="notes-admin__button notes-admin__button--quiet" type="button" disabled={saving || uploading} onClick={() => save("draft")}><Save size={17} /> Save draft</button>
                <button className="notes-admin__button" type="submit" disabled={saving || uploading}><Save size={17} /> {saving ? "Saving…" : note.status === "published" ? "Save changes" : "Save status"}</button>
                <button className="notes-admin__button notes-admin__button--publish" type="button" disabled={saving || uploading} onClick={() => save("published")}><Eye size={17} /> {note.status === "published" ? "Save & publish" : "Publish note"}</button>
              </div>
              {uploading && <p className="notes-editor__hint" role="status">Uploading media…</p>}
            </section>
            <section className="notes-editor__panel notes-editor__preview-panel">
              <h2>Preview</h2>
              <p>{note.summary || "Your summary will appear here."}</p>
              <strong>{note.title || "Your note title"}</strong>
              <span>/{note.slug || slugify(note.title) || "your-note-slug"}</span>
              <Link to="/students/notes" target="_blank">Open public notes <ArrowLeft size={15} /></Link>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}
