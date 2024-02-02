import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderAndFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  return (
    <div className="max-w-screen-xl mx-auto">
      {noHeaderAndFooter || <Navbar />}
      <Outlet />
      {noHeaderAndFooter || <Footer />}
    </div>
  );
};

export default Main;
