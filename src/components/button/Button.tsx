import {ButtonHTMLAttributes, MouseEvent} from "react";


type ButtonPropsType = {
    onClick: ()=> void;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonPropsType) => {

    const {className,  children, onClick} = props

    const onClickButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick()
    }
    return (
        <button onClick={onClickButtonHandler} className={className}>{children}</button>
    )
};