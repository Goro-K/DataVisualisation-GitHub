import React, { createContext, useState, useContext, ReactNode } from "react";

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
}

interface ApiKeyProviderProps {
  children: ReactNode;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);


export const ApiKeyProvider: React.FC<ApiKeyProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};


export const useApiKey = () => useContext(ApiKeyContext);
