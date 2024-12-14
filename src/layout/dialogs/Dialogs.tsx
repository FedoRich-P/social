import s from './Dialogs.module.css'
import {UserDialog} from "./dialog/UserDialog";
import {MessagesPagePropsType} from "../../redux/store";
import  {ChangeEvent} from "react";
import {Button} from "../../components/button/Button";
import {Message} from "./Messages/Message";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectAuth, selectUsers} from "../../app/appSelectors.ts";
import {Navigate} from "react-router-dom";

type DialogsPropsType = {
    upDateNewMessageBody: (value: string) => void
    sendMessage: () => void
    state: MessagesPagePropsType;
};

export const Dialogs = ({
                            state: {messages, newMessagesBody},
                            upDateNewMessageBody,
                            sendMessage
                        }: DialogsPropsType) => {

    const isAuth = useAppSelector(selectAuth).isAuth
    const users = useAppSelector(selectUsers).users


    const usersList = users.map((user) => <UserDialog key={user.id} {...user}/>)
    const messagesList = messages.map((message) => <Message key={message.id} {...message}/>)



    const onSendMessageClick = () => {
        sendMessage()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        upDateNewMessageBody(e.currentTarget.value)
    }

    if(!isAuth) return <Navigate to="/login"/>

    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogsTitle}>
                Dialogs
            </h2>
            <ul className={s.dialogsNames}>
                {usersList}
            </ul>
            <div>
                <ul className={s.messages}>
                    {messagesList}
                </ul>
                <form className={s.form}>
                    <textarea
                        value={newMessagesBody}
                        onChange={onNewMessageChange}
                        placeholder={'Enter your message'}>
                    </textarea>
                    <Button
                        type={'button'}
                        onClick={onSendMessageClick}
                        className={`${s.button} ${s.addButton}`}>
                        Send message
                    </Button>
                </form>
            </div>
        </div>
    );
};
