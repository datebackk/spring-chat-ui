import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
import {fetchUser} from "../store/currentUser/reducers";
import {login} from "../util/userUtil";
import "./Signin.scss"
import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";
import {message} from "antd";
import 'antd/dist/antd.css';

const Signin = (props) => {

  const dispatch = useDispatch();

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
          dispatch(fetchUser());
      })
      .catch((error) => {
          message.error(error.message);
      });
  };

    const validationSchema = yup.object().shape({
        email: yup.string().email('Не валидный email').required('Поле обязательно'),
        password: yup.string().required('Поле обязательно')
    })


  return (
      <div className="signin">
          <div className="signin__content">
              <h1 className="signin__content__title">Вход</h1>
              <p className="signin__content__subtitle">Добро пожаловать в мессенджер</p>

              <Formik initialValues={{email: '', password: ''}}
                      validateOnBlur
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                          onFinish(values)
                      }}
              >
                  {({values, errors, touched, handleBlur, handleChange, isValid, handleSubmit, isSubmitting, dirty}) => (
                      <form onSubmit={handleSubmit} className="signin__form">
                          <input value={values.email} onBlur={handleBlur} onChange={handleChange} className="signin__form__input" placeholder="Email" type="text" name="email"/>
                          {touched.email && errors.email && <p className="signin__error">{errors.email}</p>}
                          <input value={values.password} onBlur={handleBlur} onChange={handleChange} className="signin__form__input" placeholder="Password" type="password" name="password"/>
                          {touched.password && errors.password && <p className="signin__error">{errors.password}</p>}
                          <button disabled={!isValid && !dirty} className="signin__form__btn" type="submit">Войти</button>
                      </form>
                  )}
              </Formik>

              <p className="signin__footer">
                  Еще нет аккаунта? <Link className="signin__footer__link" to="/signup">Зарегистрироваться</Link>
              </p>
          </div>
      </div>
  );
};

export default Signin;