
import { useState, useEffect, ImgHTMLAttributes, SyntheticEvent } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  lowQualitySrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  lowQualitySrc,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(lowQualitySrc || src || fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Hilfsfunktion um zu bestimmen, ob ein Bild lokal oder remote ist
  const isLocalImage = (path?: string) => {
    if (!path) return false;
    return path.startsWith('/') && !path.startsWith('//');
  };

  useEffect(() => {
    if (!src) {
      setImgSrc(fallback);
      setHasError(true);
      return;
    }

    // Zurücksetzen der Status wenn src sich ändert
    setIsLoaded(false);
    setHasError(false);
    
    // Wenn es sich um ein lokales Bild handelt, verwenden wir es direkt
    if (isLocalImage(src as string)) {
      setImgSrc(src as string);
      return;
    }
    
    // Ansonsten das Bild testen
    setImgSrc(src as string);
    
    // Für Remote-Bilder eine Vorab-Ladung durchführen
    if (!isLocalImage(src as string)) {
      const img = new Image();
      img.src = src as string;
      
      img.onload = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      
      img.onerror = (event) => {
        console.warn(`Failed to load image: ${src}`);
        setImgSrc(fallback);
        setHasError(true);
        
        if (onError && typeof onError === 'function') {
          // Erstelle ein synthetisches Ereignis für TypeScript-Kompatibilität
          const syntheticEvent = {
            currentTarget: img,
            target: img,
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: event,
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            type: 'error'
          } as unknown as SyntheticEvent<HTMLImageElement, Event>;
          
          onError(syntheticEvent);
        }
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [src, fallback, onError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imgSrc}
        alt={alt || "Image"}
        className={cn(
          "transition-opacity duration-300 ease-in-out w-full h-full object-cover",
          !isLoaded && lowQualitySrc ? "filter blur-sm" : "",
          hasError ? "opacity-70" : "",
        )}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.log(`Error in img tag for: ${imgSrc}`);
          setHasError(true);
          setImgSrc(fallback);
          if (onError && typeof onError === 'function') {
            onError(e);
          }
        }}
        {...props}
      />
    </div>
  );
}
