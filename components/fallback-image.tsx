"use client";

import React, { useState, useEffect, useRef } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fallbackClassName?: string;
}

export function FallbackImage({ 
  src, 
  alt, 
  className, 
  fallbackText, 
  fallbackClassName 
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement) {
      const handleError = () => {
        setHasError(true);
      };
      
      imgElement.addEventListener('error', handleError);
      
      return () => {
        imgElement.removeEventListener('error', handleError);
      };
    }
  }, [src]);

  if (hasError && fallbackText) {
    return (
      <div className={fallbackClassName || className}>
        {fallbackText}
      </div>
    );
  }

  if (hasError) {
    return null;
  }

  return (
    <img 
      ref={imgRef}
      src={src} 
      alt={alt} 
      className={className}
    />
  );
}