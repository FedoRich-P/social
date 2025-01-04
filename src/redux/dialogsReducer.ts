import {ActionType, MessagesPagePropsType} from "./store";
import {v1} from "uuid";
import {Dispatch} from "redux";

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
}


export const dialogsReducer = (state: MessagesPagePropsType = initialState, action: ActionType): MessagesPagePropsType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: v1(), text: action.payload.text},
                ],
            };
        }
        default :
            return state;
    }

}
// export type UpdateNewMessagesBodyType = ReturnType<typeof updateNewMessagesBodyAC>
export type SendMessageType = ReturnType<typeof sendMessageAC>

// export const updateNewMessagesBodyAC = (payload: { text: string }) => {
//     return {type: UPDATE_NEW_MESSAGES_BODY, payload} as const
// }
export const sendMessageAC = (payload: { text: string }) => {
    return {type: SEND_MESSAGE, payload} as const
}

export const sendMessageTC = (payload: { text: string }) => (dispatsh: Dispatch) => {
    const {text} = payload
    dispatsh(sendMessageAC({text}))
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


// case UPDATE_NEW_MESSAGES_BODY: {
//     return {
//         ...state,
//         messages: [
//             ...state.messages,
//             {id: v1(), text: action.payload.text},
//         ],
//     }
//
//     // return {
//     //     ...state,
//     //     messages: [
//     //         ...state.messages,
//     //         {id: v1(), text: action.payload.text},
//     //     ],
//     // }
// }