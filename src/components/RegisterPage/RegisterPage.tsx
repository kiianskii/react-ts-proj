import React from "react";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit login");
  };

  return (
    <section className={s.form}>
      <h3 className={s.title}>SIGN UP</h3>

      <form onSubmit={onSubmit}>
        <label className={s.label}>
          <span>Username</span>
          <input className={s.input} type="text" name="email" id="email" />
        </label>
        <label className={s.label}>
          <span>Email</span>
          <input className={s.input} type="email" name="email" id="email" />
        </label>
        <label className={s.label}>
          <span>Password</span>
          <input className={s.input} type="text" name="email" id="email" />
        </label>
        <button className={s.button} type="submit">
          Sign up
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
