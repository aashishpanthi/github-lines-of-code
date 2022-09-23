import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const NavOnly = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavOnly;
