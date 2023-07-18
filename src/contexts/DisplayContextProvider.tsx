import React, { useState } from 'react';

type ContextType = {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setColor: (color: string) => void;
};

const Context = React.createContext<ContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const DisplayContextProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [currentColor, setCurrentColor] = useState<string>('#2C1F39');
  const [currentMode, setCurrentMode] = useState<string>('Dark');
  const [themeSettings, setThemeSettings] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.value;
    setCurrentMode(mode);
    localStorage.setItem('themeMode', mode);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const contextValue: ContextType = {
    currentColor,
    setCurrentColor,
    currentMode,
    setCurrentMode,
    themeSettings,
    setThemeSettings,
    activeMenu,
    setActiveMenu,
    setMode,
    setColor,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default DisplayContextProvider;

export const useStateContextDisplay = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useStateContextDisplay must be used within a DisplayContextProvider');
  }
  return context;
};
