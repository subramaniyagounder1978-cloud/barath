import { useState } from 'react';
import { Layers } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  aspectClass = 'aspect-video',
  className = '',
  fallbackTitle = 'Synthesis Workspace',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/70 p-8 text-center ${aspectClass} ${className}`}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1E40AF]">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-slate-900">{fallbackTitle}</p>
        <p className="mt-1 max-w-xs text-xs text-slate-500">{alt}</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${aspectClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
