import {ActionType, MessagesPagePropsType} from "./store";
import {v1} from "uuid";

const UPDATE_NEW_MESSAGES_BODY = 'UPDATE_NEW_MESSAGES_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

const imgSrc = 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'

const initialState = {
    users: [
        {id: v1(), name: "John", src: imgSrc},
        {id: v1(), name: "Alex", src: imgSrc},
        {id: v1(), name: "Elizabet", src: imgSrc},
        {id: v1(), name: "Mary", src: imgSrc},
    ],
    messages: [
        {id: v1(), text: "Hi John"},
        {id: v1(), text: "Hello ! Elizabet"},
        {id: v1(), text: "Yo Mary"},
    ],
    newMessagesBody: '',
}


export const dialogsReducer = (state: MessagesPagePropsType = initialState, action: ActionType): MessagesPagePropsType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGES_BODY: {
            return {
                ...state,
                newMessagesBody: action.payload.text
            };
        }
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: v1(), text: state.newMessagesBody},
                ],
                newMessagesBody: '',
            };
        }
        default :
            return state;
    }

}
export type UpdateNewMessagesBodyType = ReturnType<typeof updateNewMessagesBodyAC>
export type SendMessageType = ReturnType<typeof sendMessageAC>

export const updateNewMessagesBodyAC = (payload: { text: string }) => {
    return {type: UPDATE_NEW_MESSAGES_BODY, payload} as const
}
export const sendMessageAC = (payload: { text: string }) => {
    return {type: SEND_MESSAGE, payload} as const
}


// const updateNewMessagesBody = (text: string) => {
//     state.newMessagesBody = text
// };
// const sendMessageBody = () => {
//     let text = state.newMessagesBody;
//     state.newMessagesBody = ''
//     state.messages = [
//         ...state.messages,
//         {id: v1(), text},
//     ]
// };
