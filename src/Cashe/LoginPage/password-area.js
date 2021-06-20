import React from 'react';

export default function PasswordArea(props){
    return (
        <div>
            <div className = "login-area">
                <label htmlFor = "password" >Пароль</label>
            </div>
            <input type = "password" id = "password" onChange={props.onChange}/>
        </div>
    )
}