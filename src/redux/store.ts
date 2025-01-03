import {AddNewPostType, UpdateNewPostTextType} from "./profileReducer";
import {SendMessageType, UpdateNewMessagesBodyType} from "./dialogsReducer";

//Types
export type MyPostPropsType = {
    id?: string,
    src: string,
    text: string,
    likes: number,
};
// export type ProfileInfoPropsType =  DomainUser &{
//     id: string,
//     src: string,
//     name: string,
//     birthDate: string,
//     city: string,
//     education: string,
//     website: string,
// };
export type UsersProps = {
    id: string,
    name: string,
    src: string,
}
export type MessagesProps = {
    id: string,
    text: string,
}
export type ProfilePagePropsType = {
    postData: MyPostPropsType [];
    newPostText: string;
    profile: any;
    status: string;
}
export type MessagesPagePropsType = {
    users: UsersProps [];
    messages: MessagesProps[];
    newMessagesBody: string
}
export type StatePropsType = {
    profilePage: ProfilePagePropsType;
    messagesPage: MessagesPagePropsType;
}
export type ActionType = AddNewPostType | UpdateNewPostTextType | UpdateNewMessagesBodyType | SendMessageType
export type StoreType = {
    state: StatePropsType;
    callSubscriber: (value: StatePropsType) => void;
    getState: () => StatePropsType;
    subscribe: (callBack: (state: StatePropsType) => void) => void;
    dispatch: (action: any) => void;
}

// export const store: StoreType = {
//     state: <StatePropsType>{
//
//         profilePage: {
//             postData: [
//                 {
//                     id: v1(),
//                     src: 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj',
//                     text: 'First comment : Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, odio.',
//                     likes: 50,
//                 },
//                 {
//                     id: v1(),
//                     src: 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj',
//                     text: 'Second comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, odio.',
//                     likes: 100,
//                 }
//             ],
//             newPostText: 'jhguyguy',
//             profile: [
//                 {
//                     id: v1(),
//                     src: "https://sobakovod.club/uploads/posts/2022-01/1642613507_1-sobakovod-club-p-sobaki-labrador-retriver-kobel-1.jpg",
//                     name: 'Fedorich',
//                     birthDate: '06.03.1990',
//                     city: 'Msk',
//                     education: 'PGY',
//                     website: '...',
//                 }
//             ],
//         },
//         messagesPage: {
//             users: [
//                 {
//                     id: v1(),
//                     name: "John",
//                     src: 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'
//                 },
//                 {
//                     id: v1(),
//                     name: "Alex",
//                     src: 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'
//                 },
//                 {
//                     id: v1(),
//                     name: "Elizabet",
//                     src: 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'
//                 },
//                 {
//                     id: v1(),
//                     name: "Mary",
//                     src: 'https://avatars.mds.yandex.net/i?id=39012a20de9d0577cc073dc266d44100_l-5278064-images-thumbs&n=13'
//                 },
//             ],
//             messages: [
//                 {id: v1(), text: "Hi John"},
//                 {id: v1(), text: "Hello ! Elizabet"},
//                 {id: v1(), text: "Yo Mary"},
//             ],
//             newMessagesBody: '',
//         }
//     },
//     callSubscriber(value: StatePropsType) {
//
//     },
//     // =================================================
//     getState() {
//         return this.state;
//     },
//     subscribe(observer: (state: StatePropsType) => void) {
//         this.callSubscriber = observer
//     },
//     // =================================================
//     // dispatch(action: ActionType) {
//     //     this.state.profilePage = profileReducer(this.state.profilePage, action)
//     //     this.state.messagesPage = dialogsReducer(this.state.messagesPage, action)
//     //
//     //     this.callSubscriber(this.state)
//     // }
// }

// type AddNewPostType = {
//     type: typeof addNewPost,
// }

// type UpdateNewPostTextType = {
//     type: typeof updateNewPostText,
//     text: string,
// }

// ===============================================================

// addPost() {
//     this.state.profilePage.postData = [{
//         id: v1(),
//         src: src,
//         likes: 0,
//         text: this.state.profilePage.newPostText
//     }, ...this.state.profilePage.postData];
//     this.state.profilePage.newPostText = '';
//     this.callSubscriber(this.state)
// },
// updateNewPostText(text: string) {
//     this.state.profilePage.newPostText = text;
//     this.callSubscriber(this.state)
// },
// updateNewMessagesBody(text: string) {
//     this.state.messagesPage.newMessagesBody = text
//     this.callSubscriber(this.state)
// },
// sendMessageBody() {
//     let text = this.state.messagesPage.newMessagesBody;
//     this.state.messagesPage.newMessagesBody = ''
//     this.state.messagesPage.messages = [
//         ...this.state.messagesPage.messages,
//         {id: v1(), text},
//     ]
//     this.callSubscriber(this.state)
// },
// ===============================================================
// switch (action.type) {
//     case ADD_NEW_POST: {
//         this.addPost()
//         break;
//     }
//     case UPDATE_NEW_POST_TEXT: {
//         this.updateNewPostText(action.text)
//         break;
//     }
//     case UPDATE_NEW_MESSAGES_BODY: {
//         this.updateNewMessagesBody(action.text)
//         break;
//     }
//     case SEND_MESSAGE: {
//         this.sendMessageBody()
//         break;
//     }
// }

