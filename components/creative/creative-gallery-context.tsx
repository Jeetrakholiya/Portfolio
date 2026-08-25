'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CreativeGalleryContextType {
  activeMediaId: string | null;
  setActiveMediaId: (id: string | null) => void;
}

const CreativeGalleryContext = createContext<CreativeGalleryContextType | undefined>(
  undefined
);

export const CreativeGalleryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);

  return (
    <CreativeGalleryContext.Provider value={{ activeMediaId, setActiveMediaId }}>
      {children}
    </CreativeGalleryContext.Provider>
  );
};

export const useCreativeGallery = () => {
  const context = useContext(CreativeGalleryContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      activeMediaId: null,
      setActiveMediaId: () => {},
    };
  }
  return context;
};
