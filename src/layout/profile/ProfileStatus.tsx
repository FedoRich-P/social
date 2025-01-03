import {ChangeEvent, useState} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectProfile} from "../../app/appSelectors.ts";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import { UpdateProfileStatusTC} from "../../redux/profileReducer.ts";

export const ProfileStatus = () => {
    const [editMode, setEditMode] = useState(false)
    const status = useAppSelector(selectProfile).status;
    const dispatch = useAppDispatch()

     const activateEditMode = () => {
        setEditMode(editMode => !editMode)
     }

     const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
         dispatch(UpdateProfileStatusTC({status: e.currentTarget.value}))
     }


    return (
        <>
            { !editMode
                    ?
                    <div className="">
                        <h3 onDoubleClick={activateEditMode}>{status || "Статуса пока нет..."}</h3>
                    </div>
                    :
                    <div className="">
                        <input onBlur={activateEditMode} onInput={onInputChange} autoFocus type="text"/>
                    </div>
            }
        </>
    );
};