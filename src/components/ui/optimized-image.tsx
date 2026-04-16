import { useState, useRef, useEffect } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "./utils";

import { imageMappings, getWebpSrc } from '../../assets/images/image-mappings';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  webpSrc?: string;
  avifSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  webpSrc,
  avifSrc,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Auto-detect WebP version if not provided
  const optimizedWebpSrc = webpSrc || getWebpSrc(src);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const generateSrcSet = (baseSrc: string, format?: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map((w) => {
        const formattedSrc = format 
          ? baseSrc.replace(/\.(jpg|jpeg|png)$/i, `.${format}`)
          : baseSrc;
        return `${formattedSrc}?w=${w} ${w}w`;
      })
      .join(", ");
  };

  const pictureSrcSet = () => {
    const finalWebpSrc = optimizedWebpSrc || webpSrc;
    
    if (!avifSrc && !finalWebpSrc) return undefined;
    
    return (
      <>
        {avifSrc && (
          <source
            type="image/avif"
            srcSet={generateSrcSet(avifSrc, 'avif')}
            sizes={sizes}
          />
        )}
        {finalWebpSrc && (
          <source
            type="image/webp"
            srcSet={generateSrcSet(finalWebpSrc, 'webp')}
            sizes={sizes}
          />
        )}
      </>
    );
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <Skeleton 
          className="absolute inset-0 w-full h-full" 
          style={{ width, height }}
        />
      )}
      
      {isInView ? (
        <picture>
          {pictureSrcSet()}
          <img
            ref={imgRef}
            src={finalWebpSrc || src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes={sizes}
            srcSet={finalWebpSrc ? generateSrcSet(finalWebpSrc) : generateSrcSet(src)}
            width={width}
            height={height}
            {...props}
          />
        </picture>
      ) : (
        <div
          ref={imgRef}
          className="bg-muted"
          style={{ width, height }}
        />
      )}
    </div>
  );
}
