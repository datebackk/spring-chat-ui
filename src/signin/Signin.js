import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../util/ApiUtil";

const Signin = (props) => {

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      props.history.push("/");
    }
  }, []);


  const onFinish = values => {
    login(values)
      .then((response) => {
          localStorage.setItem("accessToken", response.accessToken);
          props.history.push("/");
      })
      .catch((error) => {
        if (error.status === 401) {
          console.log(401);
        } else {
          console.log(error);
        }
      });
  };

  return (
      <form onSubmit={handleSubmit(onFinish)}>
          <input className="login__form__input" placeholder="Email" type="text" name="email" ref={register}/>
          <input className="login__form__input" placeholder="Password" type="password" name="password" ref={register}/>
          <button className="login__form__btn" type="submit">Войти</button>
      </form>
  );
};

export default Signin;