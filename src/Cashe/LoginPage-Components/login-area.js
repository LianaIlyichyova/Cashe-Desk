import React from 'react';

export default function LoginArea(props){
    return (
        <div>
            <div className = "login-area">
                <label htmlFor = "login">Логин</label>
            </div>
                <input type="text" id = "login" onChange = {props.onChange}/>
        </div>
    )
}