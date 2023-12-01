import React from 'react'

function ImpatientButton({text, handleClick}){

    let impatientSemaphor = true;

    const internalHandleClick = (event) => {
        if(!impatientSemaphor){
            return false;
        }

        else{
            impatientSemaphor = false;
            
            const result = handleClick(event);

            impatientSemaphor = true;

            return result;
        }
    }

    return (
        <>
            <button onClick={internalHandleClick}>{text}</button>
        </>
    )
}

export default ImpatientButton;