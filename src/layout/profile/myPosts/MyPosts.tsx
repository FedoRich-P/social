import s from './../../../components/button/Button.module.css'
import styles from './MyPosts.module.css'
import {Button} from "../../../components/button/Button";
import {Post} from "./post/Post";
import {ProfilePagePropsType} from "../../../redux/store";
import {ChangeEvent} from 'react';

type MyPostsProps = {
    state: ProfilePagePropsType;
    addPost: ()=> void;
    updateNewPostText: (value:ChangeEvent<HTMLTextAreaElement>)=> void;
};

export const MyPosts = ({state: {postData, newPostText}, addPost, updateNewPostText}: MyPostsProps) => {

    const postList = postData.map((post: any) => <Post key={post.id} {...post}/>)

    const addPostFn = () => {
        addPost()
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewPostText(e)
    }

    return (
        <>
            <div>
                <h2 style={{marginBottom: '15px'}}>My posts</h2>
                <form className={styles.form}>
                    <textarea
                        value={newPostText}
                        onChange={onPostChange}
                        placeholder={'Enter your post'}/>
                    <Button
                        onClick={addPostFn}
                        className={`${s.button} ${s.addButton}`}>Add post</Button>
                </form>
                <ul>
                    {postList}
                </ul>
            </div>
        </>
    );
};
