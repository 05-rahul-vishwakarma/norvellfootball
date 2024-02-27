import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
