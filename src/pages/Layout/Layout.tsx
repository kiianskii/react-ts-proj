import { Outlet } from "react-router-dom";
import "../../App.css";

import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { selectisLoading } from "../../redux/loader/loaderSlice";
import Loader from "../../components/Loader/Loader";

function Layout() {
  const isLoading = useSelector(selectisLoading);

  return (
    <div>
      <Header />
      <Outlet />
      {isLoading && <Loader />}
    </div>
  );
}

export default Layout;
