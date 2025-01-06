import { SubmitHandler, useForm } from 'react-hook-form';
import s from './Login.module.css';
import { validateEmail, validatePassword } from "../components/forms/validation.ts";
import { useAppDispatch } from "../common/hooks/useAppDispatch.ts";
import { loginUsersTC, setAuthUsersTC} from "../redux/authReducer.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../common/hooks/useAppSelector.ts";
import { selectProfile } from "../app/appSelectors.ts";

type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export const Login = () => {
    return (
        <div className={s.container}>
            <h1>LogIn</h1>
            <LoginForm />
        </div>
    );
};

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Для отображения ошибки

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset
    } = useForm<FormValues>({
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const profile = useAppSelector(selectProfile).profile;
    const loginError = useAppSelector(state => state.auth.error); // Получаем ошибку из состояния

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            await dispatch(loginUsersTC(data));
            await dispatch(setAuthUsersTC());
        } catch (error) {
            console.error("Login failed", error);
            setErrorMessage("Неверный email или пароль. Пожалуйста, попробуйте снова.");
        } finally {
            reset();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth && profile) {
            navigate(`/profile/${profile.id}`);
        }
    }, [isAuth, profile, navigate]);

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
                disabled={loading || !!errors.email || !!errors.password}
                className={s.button}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>

            {/* Отображаем ошибку логина, если она есть */}
            {errorMessage && <div className={s.error}>{errorMessage}</div>}
            {loginError && <div className={s.error}>{loginError}</div>} {/* Также из состояния Redux */}
        </form>
    );
};




// import { SubmitHandler, useForm } from 'react-hook-form';
// import s from './Login.module.css';
// import { validateEmail, validatePassword } from "../components/forms/validation.ts";
// import { useAppDispatch } from "../common/hooks/useAppDispatch.ts";
// import { loginUsersTC, setAuthUsersTC } from "../redux/authReducer.ts";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppSelector } from "../common/hooks/useAppSelector.ts";
// import { selectProfile } from "../app/appSelectors.ts";
//
// type FormValues = {
//     email: string;
//     password: string;
//     rememberMe: boolean;
// };
//
// export const Login = () => {
//     return (
//         <div className={s.container}>
//             <h1>LogIn</h1>
//             <LoginForm />
//         </div>
//     );
// };
//
// export const LoginForm = () => {
//     const [loading, setLoading] = useState(false);
//
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         trigger,
//         reset
//     } = useForm<FormValues>({
//         mode: 'onBlur',
//     });
//
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const isAuth = useAppSelector((state) => state.auth.isAuth);
//     const profile = useAppSelector(selectProfile).profile;
//
//     const onSubmit: SubmitHandler<FormValues> = async (data) => {
//         setLoading(true);
//         try {
//             await dispatch(loginUsersTC(data));
//             await dispatch(setAuthUsersTC());
//         } finally {
//             reset();
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         if (isAuth && profile) {
//             navigate(`/profile/${profile.id}`);
//         }
//     }, [isAuth, profile, navigate]);
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
//             <label className={s.label}>
//                 Email:
//                 <input
//                     type="email"
//                     placeholder="Enter your email"
//                     {...register('email', {
//                         required: 'Email is required',
//                         validate: validateEmail,
//                     })}
//                     onBlur={() => trigger('email')}
//                     className={`${s.input} ${errors.email ? s.errorInput : ''}`}
//                 />
//                 {errors.email && (
//                     <div className={s.error}>
//                         {errors.email.message}
//                     </div>
//                 )}
//             </label>
//
//             <label className={s.label}>
//                 Password:
//                 <input
//                     type="password"
//                     placeholder="Enter your password"
//                     {...register('password', {
//                         required: 'Password is required',
//                         validate: validatePassword,
//                     })}
//                     onFocus={() => trigger('email')}
//                     onBlur={() => trigger('password')}
//                     className={`${s.input} ${errors.password ? s.errorInput : ''}`}
//                 />
//                 {errors.password && (
//                     <div className={s.error}>
//                         {errors.password.message}
//                     </div>
//                 )}
//             </label>
//
//             <label className={s.checkboxLabel}>
//                 Remember me:
//                 <input
//                     type="checkbox"
//                     {...register('rememberMe')}
//                     className={s.checkbox}
//                 />
//             </label>
//
//             <button
//                 type="submit"
//                 disabled={loading || !!errors.email || !!errors.password}
//                 className={s.button}
//             >
//                 {loading ? 'Loading...' : 'Login'}
//             </button>
//         </form>
//     );
// };
