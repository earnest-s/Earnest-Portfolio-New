import { useEffect, useId, useState } from 'react';
import '../styles/previewable-image.css';

interface PreviewableImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  wrapperClassName?: string;
  loading?: 'eager' | 'lazy';
}

export const PreviewableImage = ({
  src,
  alt,
  imageClassName,
  wrapperClassName,
  loading = 'lazy',
}: PreviewableImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div className={`previewable-image ${wrapperClassName ?? ''}`.trim()}>
        <img src={src} alt={alt} loading={loading} className={imageClassName} />
        <button
          type="button"
          className="previewable-image-expand"
          aria-label={`Expand image preview: ${alt}`}
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-expand" aria-hidden="true" />
          <span>Expand</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="image-preview-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setIsOpen(false)}
        >
          <div className="image-preview-dialog" onClick={(event) => event.stopPropagation()}>
            <div className="image-preview-toolbar">
              <p id={titleId} className="image-preview-title">{alt}</p>
              <button
                type="button"
                className="image-preview-close"
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-xmark" aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>

            <div className="image-preview-body">
              <img src={src} alt={alt} className="image-preview-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
