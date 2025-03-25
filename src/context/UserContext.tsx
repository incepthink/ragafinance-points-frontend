"use client";

import React, { createContext, useContext, useState } from "react";

type UserData = {
  user: any;
  userDeposits: any[];
  userPoints: any[];
  totalValueDeposited: number;
  totalPointsEarned: number;
  userReference:
    | any[]
    | {
        eth_address: string;
        createdAt: string;
        updatedAt: string;
      };
} | null;

type UserContextType = {
  data: UserData;
  setUserData: (data: UserData) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserData>(null);

  const setUserData = (userData: UserData) => {
    setData(userData);
  };

  return (
    <UserContext.Provider value={{ data, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserProvider");
  return ctx;
};
