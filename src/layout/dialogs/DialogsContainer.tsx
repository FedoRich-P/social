import {MessagesPagePropsType} from "../../redux/store";
import {sendMessageAC, updateNewMessagesBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/redux-store";

type DialogsContainerProps = {
};

export const DialogsContainer = () => {
    const state = useSelector<RootState, MessagesPagePropsType>(state=> state.dialogs)

    const dispatch = useDispatch();

    const onSendMessageClick = () => {
        dispatch(sendMessageAC({text: state.newMessagesBody}))
    }

    const onNewMessageChange = (text: string) => {
        dispatch(updateNewMessagesBodyAC({text}))
    }

    return (
        <Dialogs sendMessage={onSendMessageClick} upDateNewMessageBody={onNewMessageChange} state={state}/>
    );
};
