import s from './../../../components/button/Button.module.css'
import styles from './MyPosts.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../common/hooks/useAppSelector.ts";
import {selectProfile} from "../../../app/appSelectors.ts";
import {Post} from "./post/Post.tsx";
import {AddNewPosTC} from "../../../redux/profileReducer.ts";

export const MyPosts = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<{ text: string }>({
        mode: 'onBlur',
    });

    const postData = useAppSelector(selectProfile)?.postData

    const postsList = postData.map((post: any) => <Post key={post.id} {...post}/>)

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<{ text: string }> = (data) => {
        const {text} = data;

        try {
            dispatch(AddNewPosTC({text}));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            reset();
        }
    };

    return (
        <>
            <div>
                <h2 style={{marginBottom: '15px'}}>My posts</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                   <textarea
                       {...register('text', {required: 'Message is required'})}
                       placeholder="Enter your post"
                   />
                    {errors.text && <div className={s.error}>{errors.text.message}</div>}
                    <button type="submit" className={`${s.button} ${s.addButton}`}>
                        Add post
                    </button>

                </form>
                <ul>
                    {postsList}
                </ul>
            </div>
        </>
    );
};


// type MyPostsProps = {
//     state: ProfilePagePropsType;
//     addPost: ()=> void;
//     updateNewPostText: (value:ChangeEvent<HTMLTextAreaElement>)=> void;
// };

// const postList = postData.map((post: any) => <Post key={post.id} {...post}/>)
//
// const addPostFn = () => {
//     addPost()
// }
// const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     updateNewPostText(e)
// }