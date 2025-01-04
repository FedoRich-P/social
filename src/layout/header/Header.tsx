import s from './Header.module.css'
import {Button} from "@mui/material";
import {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import {exitAuthUsersTC, setAuthUsersTC} from "../../redux/authReducer.ts";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectAuth} from "../../app/appSelectors.ts";

export type Response = {
    resultCode: number,
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string,
    }
}

export const Header = () => {
    const dispatch = useAppDispatch();
    const myProfile = useAppSelector(selectAuth)
    // const myProfile = useSelector((state: RootState) => state.auth);

    useEffect(() => {
       dispatch(setAuthUsersTC())
    }, [])

    return (
        <header className={s.header}>
            <h1>Socials</h1>
            <div>
                {myProfile.isAuth ? <div style={{display: 'flex'}}>
                    <h2 className={s.pagesTitle}>{myProfile.login}'s page</h2>
                    <button className={s.exitButton} onClick={() => {
                        dispatch(exitAuthUsersTC())
                    }}>Exit
                    </button>
                </div> : <Button href={'/login'} style={{
                    padding: ' 5px 20px',
                    border: '2px solid white',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }}>Login</Button>}
            </div>

        </header>
    );
};

// authAPI.getMe().then(res => {
//         if (res.resultCode === 0) {
//             dispatch(setAuthUsersAC(res.data));
//         }
//     }
// )