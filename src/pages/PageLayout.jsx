import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header"
import Footer from "./Footer/Footer";

function PageLayout() {
  return (
    <div>
      <main>
        <Header />
        <hr/>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;
