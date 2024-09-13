import React from "react";
import s from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
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

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const resultAction = await dispatch(loginThunk({ email, password }));

      if (!loginThunk.fulfilled.match(resultAction)) {
        toast("Something went wrong, try again...", msgOptions);
      } else {
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Something went wrong, try again...", msgOptions);
    }
  };

  return (
    <section className={s.form}>
      <h3 className={s.title}>SIGN IN</h3>

      <form onSubmit={onSubmit}>
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
            Sign in
          </button>
          <button
            className={s.nav_button}
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
