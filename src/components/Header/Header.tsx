import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import s from "./Header.module.css";

const Header = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={s.header}>
      <h1 className={s.title}>Task manager</h1>
      {isLogged && (
        <ul className={s.user_bar}>
          <li className={s.title}>
            <h2>{user.username}</h2>
          </li>
          <li>
            <button
              className={s.button}
              onClick={() => dispatch(logoutThunk())}
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
