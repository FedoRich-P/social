import {useEffect} from "react";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import {logoutUsersTC, setAuthUsersTC} from "../../redux/authReducer.ts";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectAuth} from "../../app/appSelectors.ts";
import {useNavigate} from "react-router-dom";  // для редиректа
import s from './Header.module.css'

export const Header = () => {
    const dispatch = useAppDispatch();
    const myProfile = useAppSelector(selectAuth);
    const navigate = useNavigate(); // добавим навигацию

    useEffect(() => {
        dispatch(setAuthUsersTC());
    }, [dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUsersTC());
        navigate("/login");
    };

    useEffect(() => {
        if (myProfile.isAuth) {
            navigate(`/profile/${myProfile.id}`);
        }
    }, [myProfile.isAuth, myProfile.id, navigate]);

    return (
        <header className={s.header}>
            <h1>Socials</h1>
            <div>
                {myProfile.isAuth ? (
                    <div style={{display: "flex"}}>
                        <h2 className={s.pagesTitle}>{myProfile.login}'s page</h2>
                        <button className={s.exitButton} onClick={handleLogout}>Exit</button>
                    </div>
                ) : (
                    <Button
                        href="/login"
                        style={{
                            padding: "5px 20px",
                            border: "2px solid white",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                        }}
                    >
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
};
