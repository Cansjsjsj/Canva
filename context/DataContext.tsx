import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { GuestData, DataContextType } from '../types';
import * as guestApi from '../api/guestApi';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guestData, setGuestData] = useState<GuestData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await guestApi.getGuestData();
        setGuestData(data);
      } catch (e) {
        console.error("Failed to load guest data", e);
        setError("Failed to load guest data. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addGuestData = async (data: { field1: string; field2: string }) => {
    try {
      const newData = await guestApi.addGuestData(data);
      // Add the new data to the top of the list for immediate UI feedback
      setGuestData(prevData => [newData, ...prevData]);
    } catch (e) {
      console.error("Failed to save guest data", e);
      setError("Failed to save guest data. Please try again.");
      // Re-throw the error so the form component knows the primary action failed.
      throw e;
    }
  };

  return (
    <DataContext.Provider value={{ guestData, addGuestData, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
