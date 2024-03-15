"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [userBalance, setUserBalance] = React.useState(null);
  let router = useRouter();
  useEffect(() => {
    if (
      !window.location.href.includes("admin") &&
      !window.location.href.includes("access") &&
      userBalance === null
    ) {
      getBalance();
    }
  }, []);
  async function getBalance() {
    try {
      let res = await fetch(`/api/user`);
      res = await res.json();
      if (res?.status === 200) setUserBalance(res?.data?.Balance);
      if (res?.status === 302) {
        alert("sessioin time out");
        router.push("/access/login");
      }
    } catch (error) {
      alert(error);
      // router.push("/access/login");
    }
  }
  return (
    <UserContext.Provider value={{ userBalance, getBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
