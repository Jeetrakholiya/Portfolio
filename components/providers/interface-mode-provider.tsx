'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type InterfaceMode = 'syntax' | 'fuel' | 'eric-cole';

interface InterfaceModeContextType {
  mode: InterfaceMode;
  setMode: (mode: InterfaceMode) => void;
  toggleMode: () => void;
}

const InterfaceModeContext = createContext<InterfaceModeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_interface_mode';

export const InterfaceModeProvider: React.FC<{
  children: React.ReactNode;
  initialMode?: InterfaceMode;
}> = ({ children, initialMode = 'syntax' }) => {
  const [mode, setModeState] = useState<InterfaceMode>(initialMode);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as InterfaceMode | null;
      if (saved && (saved === 'syntax' || saved === 'fuel' || saved === 'eric-cole')) {
        setModeState(saved);
      } else if (initialMode) {
        setModeState(initialMode);
      }
    } catch {
      // localStorage fallback
    }
  }, [initialMode]);

  const setMode = (newMode: InterfaceMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // localStorage fallback
    }
  };

  const toggleMode = () => {
    if (mode === 'syntax') setMode('fuel');
    else if (mode === 'fuel') setMode('eric-cole');
    else setMode('syntax');
  };

  return (
    <InterfaceModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </InterfaceModeContext.Provider>
  );
};

export function useInterfaceMode() {
  const context = useContext(InterfaceModeContext);
  if (!context) {
    throw new Error('useInterfaceMode must be used within an InterfaceModeProvider');
  }
  return context;
}
