import {MessagesProps} from "../../../redux/store";

export const Message = ({text}: MessagesProps) => {
    return (
        <li>{text}</li>
    );
};