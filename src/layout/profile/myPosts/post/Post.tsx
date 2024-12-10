import s from './Post.module.css'
import {Button} from "../../../../components/button/Button";
import buttonStyle from "../../../../components/button/Button.module.css";
import {MyPostPropsType} from "../../../../redux/store";

export const Post = ({src, text, likes}: MyPostPropsType) => {
    return (
        <>
            <li className={s.postItem}>
                <div className={s.description}>
                    <div className={s.imageWrapper}>
                        <img src={src} alt="User post image"/>
                    </div>
                    <p className={s.descr}>{text}</p>
                </div>
                <div>
                    <span className={s.postsLikes}>Likes : {likes}</span>
                    <Button onClick={()=>{}} className={buttonStyle.button}>Like</Button>
                </div>
            </li>
        </>
    );
};