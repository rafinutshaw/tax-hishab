import React from "react";
import Navbar from "../components/genericComponents/navbar/navbar.component";

const Layout = ({ children }: any) => {
  return (
    <div>
      {/* Your layout structure */}
      <header>
        <title>Tax Hishab</title>
        <meta name="description" content="Calculate your tax" />
      </header>
      <main>
        <div className="w-full h-min-screen flex justify-center bg-white">
          <Navbar />
          <div className="container mt-16 bg-white">{children}</div>
        </div>
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
