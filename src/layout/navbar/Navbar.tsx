import s from './Navbar.module.css'
import React from "react";
import {NavLink} from "react-router-dom";

type Props = {};
export const Navbar = (props: Props) => {

    return (
        <aside className={s.aside}>
            <nav>
                <ul className={s.navList}>
                    <li>
                        <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/profile">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/dialogs">Messages</NavLink>
                    </li>
                    <li>
                        <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/news">News</NavLink>
                    </li>
                    <li>
                        <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/music">Music</NavLink>
                    </li>
                </ul>
                <NavLink className={navData => navData.isActive ? `${s.asideLink} ${s.active}` : s.asideLink} to="/settings">Settings</NavLink>
            </nav>
        </aside>
    );
};