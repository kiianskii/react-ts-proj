import React from "react";
import s from "./RegisterPage.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { registerThunk } from "../../redux/auth/operations";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    dispatch(registerThunk({ email, password, username }));

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
        <button className={s.button} type="submit">
          Sign up
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
