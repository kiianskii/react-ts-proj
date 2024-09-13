import React from "react";
import s from "./RegisterPage.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginThunk, registerThunk } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const msgOptions = {
  icon: "😞",
  style: {
    border: "1px solid #713200",
    padding: "16px",
    color: "#713200",
  },
  iconTheme: {
    primary: "#713200",
    secondary: "#FFFAEE",
  },
};

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    dispatch(registerThunk({ email, password, username }));

    try {
      const resultAction = await dispatch(
        registerThunk({ email, password, username })
      );
      if (registerThunk.fulfilled.match(resultAction)) {
        await dispatch(loginThunk({ email, password }));
        navigate("/");
      } else {
        toast("Something went wrong, try again...", msgOptions);
      }
    } catch (error) {
      toast("Something went wrong, try again...", msgOptions);
    }

    form.reset();
  };

  return (
    <section className={s.form}>
      <h3 className={s.title}>SIGN UP</h3>

      <form onSubmit={onSubmit}>
        <label className={s.label}>
          <span>Username</span>
          <input
            className={s.input}
            type="text"
            name="username"
            id="username"
          />
        </label>
        <label className={s.label}>
          <span>Email</span>
          <input className={s.input} type="email" name="email" id="email" />
        </label>
        <label className={s.label}>
          <span>Password</span>
          <input
            className={s.input}
            type="password"
            name="password"
            id="password"
          />
        </label>
        <div className={s.btn_wrapper}>
          <button className={s.button} type="submit">
            Sign up
          </button>
          <button
            className={s.nav_button}
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
