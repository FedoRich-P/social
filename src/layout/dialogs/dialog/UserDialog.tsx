import s from './UserDialod.module.css'
import {NavLink} from "react-router-dom";
import {UsersProps} from "../../../redux/store";

export const UserDialog = ({id, name, src}: UsersProps) => {
    return (
        <li>
            <NavLink className={s.dialog} to={`/dialogs/${id}`}>
                <img className={s.dialogAvatar} src={src} alt="User Photo"/>
                <span>{name}</span>
            </NavLink>
        </li>
    );
};