import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const NavAndFoolterLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default NavAndFoolterLayout;
