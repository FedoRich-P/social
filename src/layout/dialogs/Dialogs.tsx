import s from './Dialogs.module.css'
import {UserDialog} from "./dialog/UserDialog";
import {Message} from "./Messages/Message";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectAuth, selectDialogs, selectUsers} from "../../app/appSelectors.ts";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import {sendMessageTC} from "../../redux/dialogsReducer.ts";
import {SubmitHandler, useForm} from "react-hook-form";


export const Dialogs = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ text: string }>({
        mode: 'onBlur',
    });

    const isAuth = useAppSelector(selectAuth).isAuth;
    const users = useAppSelector(selectUsers).users;
    const messages = useAppSelector(selectDialogs).messages;
    const dispatch = useAppDispatch();

    const usersList = users.map((user) => <UserDialog key={user.id} {...user} />);
    const messagesList = messages.map((message) => <Message key={message.id} {...message} />);

    if (!isAuth) return <Navigate to="/login" />;

    const onSubmit: SubmitHandler<{ text: string }> = (data) => {
        const { text } = data;

        try {
             dispatch(sendMessageTC({ text }));
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            reset();
        }
    };

    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogsTitle}>Dialogs</h2>
            <ul className={s.dialogsNames}>{usersList}</ul>
            <div>
                <ul className={s.messages}>{messagesList}</ul>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <textarea
                        {...register('text', {required: 'Message is required'})}
                        placeholder="Enter your message"
                    />
                    {errors.text && <div className={s.error}>{errors.text.message}</div>}
                    <button
                        type="submit"
                        className={`${s.button} ${s.addButton}`}
                        disabled={!!errors.text}
                    >
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
};

