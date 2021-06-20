import React from 'react';

export default function ProductCodeInput(props){
    return(
        <>
        <label htmlFor = "code-input">Ввод кода товара...</label>
            <input type = "text" id= "code-input" onClick = {(e)=>e.target.select()}/>
            {
             (props.productCode === "" || props.productCode === "true") ? <><p style = {{fontSize: "12px", visibility: "hidden"}}>.........</p></> : 
             <><p style = {{ color: "#ef8354", fontSize: "12px", marginLeft: "34.1%", marginTop: "auto" }}>Несуществующий товар</p></>
            }
        </>
    )
}