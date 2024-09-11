import React from "react";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Email:", email);
    console.log("Password:", password);

    form.reset();
  };

  return (
    <section className={s.form}>
      <h3 className={s.title}>SIGN IN</h3>

      <form onSubmit={onSubmit}>
        <label className={s.label}>
          <span>Email</span>
          <input className={s.input} type="text" name="email" id="email" />
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
          Sign in
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
