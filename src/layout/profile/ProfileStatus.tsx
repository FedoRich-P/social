import {useState} from "react";

export const ProfileStatus = () => {

    const [editMode, setEditMode] = useState(false)

     const activateEditMode = () => {
        setEditMode(editMode => !editMode)
     }

     // const deactivateEditMode = () => {
     //     console.log(editMode)
     //    setEditMode(editMode => !editMode)
     // }

    return (
        <>
            { !editMode
                    ?
                    <div className="">
                        <h3 onDoubleClick={activateEditMode}>'Status'</h3>
                    </div>
                    :
                    <div className="">
                        <input onBlur={activateEditMode} autoFocus type="text"/>
                    </div>
            }
        </>
    );
};