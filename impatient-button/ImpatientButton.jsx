import React from 'react'

function ImpatientButton({text, handleClick}){

    let impatientSemaphor = true;

    const internalHandleClick = (event) => {
        if(!impatientSemaphor){
            return false;
        }

        else{
            blockSemaphor();
            
            const result = executeClick(event);

            result.then(() => unblockSemaphor());

            return result;
        }
    }

    const executeClick = (event) => {
        const clickFunctionResult = handleClick(event);

        //If it's a promise, then return it
        if(clickFunctionResult.then){
            return clickFunctionResult;
        }
        else{
            //If not, create a promise so it can be waited
            return new Promise(() => handleClick(event));
        }
    }

    const blockSemaphor = () => { impatientSemaphor = false; }

    const unblockSemaphor = () => { impatientSemaphor = true; }

    return (
        <>
            <button onClick={internalHandleClick}>{text}</button>
        </>
    )
}

export default ImpatientButton;