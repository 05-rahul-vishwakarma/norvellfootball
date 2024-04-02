import Footer from "./components/Footer";
import Modal from "./components/Modal";
import "./globals.css";
import { AlertContextProvider } from "./helpers/AlertContext";
import UserContextProvider from "./helpers/UserContext";

export const metadata = {
  title: "NorvellFootball",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserContextProvider>
          <AlertContextProvider>{children}</AlertContextProvider>
        </UserContextProvider>
        <script src="https://unpkg.com/webtonative@1.0.52/webtonative.min.js"></script>
      </body>
    </html>
  );
}
