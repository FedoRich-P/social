import {MessagesPagePropsType} from "./store";
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

export const dialogsReducer = (state: MessagesPagePropsType = initialState, action: DialogsType): MessagesPagePropsType => {

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

export type DialogsType = ReturnType<typeof sendMessageAC>

export const sendMessageAC = (payload: { text: string }) => {
    return {type: SEND_MESSAGE, payload} as const
}

export const sendMessageTC = (payload: { text: string }) => (dispatch: Dispatch) => {
    dispatch(sendMessageAC({text: payload.text}))
}

