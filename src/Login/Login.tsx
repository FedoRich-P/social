import {useForm, SubmitHandler} from 'react-hook-form';
import s from './Login.module.css';
import {validateEmail, validatePassword} from "../components/forms/validation.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {loginAuthUsersTC, setAuthUsersTC} from "../redux/authReducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const Login = () => {
    return (
        <div className={s.container}>
            <h1>LogIn</h1>
            <LoginForm/>
        </div>
    );
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        trigger,
    } = useForm<FormValues>({
        mode: 'onBlur',
    });
    const {reset} = useForm<FormValues>();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
        }
    }, [isAuth, navigate]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const { password, rememberMe, email } = data;

        try {
            dispatch(loginAuthUsersTC(email, password, rememberMe));
            dispatch(setAuthUsersTC())
        } catch (error) {
            console.error('Error:', error);
        } finally {
            reset();
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <label className={s.label}>
                Email:
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                        required: 'Email is required',
                        validate: validateEmail,
                    })}
                    onBlur={() => trigger('email')}
                    className={`${s.input} ${errors.email ? s.errorInput : ''}`}
                />
                {errors.email && (
                    <div className={s.error}>
                        {errors.email.message}
                    </div>
                )}
            </label>


            <label className={s.label}>
                Password:
                <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                        required: 'Password is required',
                        validate: validatePassword,
                    })}
                    onFocus={() => trigger('email')}
                    onBlur={() => trigger('password')}
                    className={`${s.input} ${errors.password ? s.errorInput : ''}`}
                />
                {errors.password && (
                    <div className={s.error}>
                        {errors.password.message}
                    </div>
                )}
            </label>

            <label className={s.checkboxLabel}>
                Remember me:
                <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className={s.checkbox}
                />
            </label>

            <button
                type="submit"
                disabled={!!errors.email || !!errors.password}
                className={s.button}
            >
                Login
            </button>
        </form>
    );
};