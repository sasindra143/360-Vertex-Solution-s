function Lightbox({ images, index, setIndex, close }) {
  return (
    <div className="lightbox-overlay" onClick={close}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={close}>✕</button>
        <button className="lightbox-prev" onClick={() =>
          setIndex(index === 0 ? images.length - 1 : index - 1)
        }>‹</button>

        <img src={images[index]} className="lightbox-image" />

        <button className="lightbox-next" onClick={() =>
          setIndex(index === images.length - 1 ? 0 : index + 1)
        }>›</button>
      </div>
    </div>
  );
}

export default Lightbox;
