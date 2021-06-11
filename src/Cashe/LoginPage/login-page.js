import React, {useEffect, useState} from 'react';
import firebase from "../../firebase";
import { Link } from 'react-router-dom';
import './login-page.css';
import SelectCasheDeskNumber from "./cashe-desk-number-select";


export default function LoginPage(props){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [clickCount, setClickCount] = useState(0);
    const [userName, setUserName] = useState("");
    const [casheDeskNumber, setCasheDeskNumber] = useState("1");
    const [users, setUsers] = useState([]);
    const [to, setTo] = useState("/");
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(()=>{
        const ref = firebase.firestore().collection("users");
            ref.get().then((item)=>{
                const items = item.docs.map((doc)=>doc.data());
                setUsers(items);
            }); 
    },[]);

    useEffect(()=>{
        let cashier = users.filter((el)=>(el.login === login) && (el.password === password)); 
        let user = cashier && cashier[0] ? cashier[0].name : "";
        setUserName(user);
        user ? setTo("/cashe") : setTo("/");
    }, [users, login, password, casheDeskNumber]);

    useEffect(()=>{
        if (!isLoggedIn) {   
            props.history.push("/"); 
        }
    }, [isLoggedIn, props.history]);

    function handleLogin(e){
        setLogin(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleSelectOfCasheDeskNumber(value) {
        (typeof(value) === String ? setCasheDeskNumber(value) : setCasheDeskNumber(value.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(userName){
            setisLoggedIn(true);
        }
        setClickCount(clickCount+1);
    }

        return(
            <div>
                {users.length === 0 ? 
                <p style = {{
                    paddingTop: "18%",
                    paddingBottom: "26.2%",
                    margin:"0", 
                    textAlign: "center",
                    color: "#ef8354"}}>
                Загрузка....
                </p> :  
                <form>
                <div id="login-elements">
                    <div className="login-form">
                        <LoginArea onChange={handleLogin}/>
                        <PasswordArea onChange={handlePassword}/>
                    </div>
                    <div className = "select-cashe">
                        <label htmlFor ="text-input">Касса номер...</label>
                        <SelectCasheDeskNumber onChange = {handleSelectOfCasheDeskNumber} 
                            data = {casheDeskNumber}/>
                    </div>
                    <div className = "login-area" >
                    
                    <button type = "submit"  className = "login-button" onClick = {handleSubmit}>
                    <Link to = {{
                        pathname: to,
                        state: {
                        cashier: userName,
                        casheDeskNumber: casheDeskNumber,
                        startDate: new Date().toLocaleString("ru"),
                        }
                    }}> Вход </Link>
                    
                    </button>
                        { (clickCount > 0 && !userName) ? <><p style={{color: "#ef8354"}}>Несуществуюий пользователь</p></> :  <><p></p></>
                        }   
                    </div> 
                </div>
            </form>}
            </div>
        );
}



function LoginArea(props){
    return (
        <div>
            <div className = "login-area">
                <label htmlFor = "login">Логин</label>
            </div>
                <input type="text" id = "login" onChange = {props.onChange}/>
        </div>
    )
}

function PasswordArea(props){
    return (
        <div>
            <div className = "login-area">
                <label htmlFor = "password" >Пароль</label>
            </div>
            <input type = "password" id = "password" onChange={props.onChange}/>
        </div>
    )
}