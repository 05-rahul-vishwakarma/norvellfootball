"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [userBalance, setUserBalance] = React.useState(null);
  let router = useRouter();
  useEffect(() => {
    if (!window.location.href.includes("access") && userBalance === null) {
      getBalance();
    }
  }, []);
  async function getBalance() {
    try {
      let res = await fetch(`${window.location.origin}/api/user`);
      res = await res.json();
      if (res?.status === 200) setUserBalance(res?.data?.Balance);
      if (res?.status === 302) router.push("/access/login");
    } catch (error) {
      router.push("/access/login");
    }
  }
  return (
    <UserContext.Provider value={{ userBalance, getBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
