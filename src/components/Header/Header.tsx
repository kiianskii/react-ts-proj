import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";

const Header = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Task manager</h1>
      {isLogged && (
        <ul>
          <li>{user.username}</li>
          <li>
            <button onClick={() => dispatch(logoutThunk())}>Log out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
