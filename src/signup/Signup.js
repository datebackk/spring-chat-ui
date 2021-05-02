import React, { useEffect } from "react";
import {signup} from "../util/userUtil";
import {Formik} from "formik";
import {Link} from "react-router-dom";
import * as yup from "yup";

const Signup = (props) => {

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            props.history.push("/");
        }
    }, []);


    const onFinish = values => {
        values["roles"] = [{name: 'USER'}]
        signup(values)
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

    const validationSchema = yup.object().shape({
        email: yup.string().required('пустое сообщение'),
        password: yup.string().required('пустое сообщение')
    })

    return (
        <div className="signin">
            <div className="signin__content">
                <h1 className="signin__content__title">Регистрация</h1>
                <p className="signin__content__subtitle">Добро пожаловать в мессенджер</p>

                <Formik initialValues={{email: '', nickname: '', password: ''}}
                        validateOnBlur
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onFinish(values)
                        }}
                >
                    {({values, errors, touched, handleChange, isValid, handleSubmit, isSubmitting, dirty}) => (
                        <form onSubmit={handleSubmit} className="signin__form">
                            <input value={values.email} onChange={handleChange} className="signin__form__input" placeholder="Email" type="text" name="email"/>
                            <input value={values.nickname} onChange={handleChange} className="signin__form__input" placeholder="Nickname" type="text" name="nickname"/>
                            <input value={values.password} onChange={handleChange} className="signin__form__input" placeholder="Password" type="password" name="password"/>
                            <button disabled={!isValid && !dirty} className="signin__form__btn" type="submit">Зарегистрироваться</button>
                        </form>
                    )}
                </Formik>

                <p className="signin__footer">
                    Уже зарегистрированы? <Link className="signin__footer__link" to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;