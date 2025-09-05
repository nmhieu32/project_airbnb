import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function HomeTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#D1F8EF' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
