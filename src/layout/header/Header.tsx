import s from './Header.module.css'
import {Button} from "@mui/material";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import {setAuthUsersAC} from "../../redux/authReducer.ts";
import {RootState} from "../../redux/redux-store.ts";

type Response = {
    resultCode: number,
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string,
    }
}

export const Header = () => {
    const dispatch = useDispatch();
    const myProfile = useSelector((state: RootState) => state.auth);
    // const currentPage = useSelector<RootState, number>((state) => state.users.currentPage);
    useEffect(() => {
        axios.get<Response>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setAuthUsersAC(res.data.data));
            }
        })
    }, [])
    return (
        <header className={s.header}>
            <h1>Socials</h1>
            <div >
                {myProfile.isAuth ? myProfile.login : <Button href={'/login'} style={{  padding:' 5px 20px', border: '2px solid white', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem'}}>Login</Button>}
                {/*<NavLink to={'/login'}>Login</NavLink>*/}
            </div>
        </header>
    );
};