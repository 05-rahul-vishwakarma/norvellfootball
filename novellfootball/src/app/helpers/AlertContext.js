"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";

export const AlertContext = createContext();

/**
 * this context will provide the alert box to every page and will export   getAlert function
 * get alert function take two arguments message "String" and type which can be "success" "pending" or error
 * this will return a promiss which will get resolve only when the user clicks the ok button
 *
 * close Alert function takes no argument but String redirect can be passed
 * to the function explisitly to redirect the user to login page if some error occurs;
 */

export const AlertContextProvider = ({ children }) => {
  const [isActive, updateActive] = useState(false);
  const [AlertDetails, updateAlertDetails] = useState({
    message: "Loading...",
    image: "/logo.png",
    status: "pending...",
  });
  const router = useRouter();

  function getAlert(type = "pending", message = "loading...") {
    let image = "/logo.png";
    if (type === "Success") {
      image = "/success.png";
    } else if (type === "Opps!") {
      // updateImage()
      image = "/opps.png";
    } else if (type === "pending") {
      // updateImage("/pending.png")
      image = "/pending.png";
    }

    updateAlertDetails({
      message: message,
      image,
      status: type,
    });
    updateActive(true);
  }

  function closeAlert(type = "close") {
    updateAlertDetails({
      message: "Loading...",
      status: "pending",
      image: "/logo.png",
    });
    updateActive(false);
    if (type === "redirect") {
      router.push("/access/login");
    }
  }

  return (
    <AlertContext.Provider
      value={{ AlertDetails, getAlert, closeAlert, isActive }}
    >
      {children}
    </AlertContext.Provider>
  );
};
