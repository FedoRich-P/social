//Types
export type MyPostPropsType = {
    id?: string,
    src: string,
    text: string,
    likes: number,
};

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
    profile: any;
    status: string;
}
export type MessagesPagePropsType = {
    users: UsersProps [];
    messages: MessagesProps[];
}

