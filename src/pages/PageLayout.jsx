import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function PageLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <hr />
      <main className="flex-grow overflow-hidden">
        <Outlet />
      </main>
      <hr />
      <Footer />
    </div>
  );
}
