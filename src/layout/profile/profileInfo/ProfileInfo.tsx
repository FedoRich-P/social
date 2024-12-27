import s from './ProfileInfo.module.css'
import {DomainUser} from "../../../redux/profileReducer";
import {ProfileStatus} from "../ProfileStatus.tsx";

export const ProfileInfo = (user: DomainUser) => {
    const {
        fullName, photos, aboutMe, lookingForAJob
    } = user
    return (
        <>
            <article className={s.userCard}>
                <div>
                    <div className={s.imgWrapper}>
                        <img
                            src={photos?.large}
                            alt="User photo"/>
                    </div>
                    <ProfileStatus/>
                </div>

                <ul className={s.userData}>
                    <li>
                        <dt>Name</dt>
                        <dd>{fullName}</dd>
                    </li>
                    <li>
                        <dt>About me</dt>
                        <dd>{aboutMe}</dd>
                    </li>
                    <li>
                        <dt>Looking for a job</dt>
                        <dd> {lookingForAJob ? 'Yes' : "No"} </dd>
                    </li>
                </ul>
            </article>
        </>
    );
};