import s from './UserDialod.module.css'
import {NavLink} from "react-router-dom";
import {UserFromData} from "../../../redux/usersReducer.ts";

export const UserDialog = ({id, name, photos}: UserFromData) => {
    return (
        <li>
            <NavLink className={s.dialog} to={`/dialogs/${id}`}>
                <img className={s.dialogAvatar} src={photos.small} alt="User Photo"/>
                <span>{name}</span>
            </NavLink>
        </li>
    );
};