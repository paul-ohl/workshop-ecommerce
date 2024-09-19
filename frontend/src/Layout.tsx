import { Outlet } from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
