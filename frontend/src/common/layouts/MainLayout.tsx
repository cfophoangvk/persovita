import AppHeader from "../components/AppHeader";
import { Outlet } from "react-router-dom";
import AppFooter from "../components/AppFooter";

const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default MainLayout;
