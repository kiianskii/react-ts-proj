// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/auth/slice";
// import { Navigate } from "react-router-dom";

// export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
// };

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/slice";
import { Navigate } from "react-router-dom";

interface PropsTypes {
  component: React.ComponentType;
  redirectTo: string;
}

export const RestrictedRoute: React.FC<PropsTypes> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
