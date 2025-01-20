import { useState } from "react";
import Cookies from "universal-cookie";
import Header from "./Header";
const cookies = new Cookies();

export default function LoginPage({}){
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async() => {
        const data = { email: email, password: password };
        const res = await fetch('http://localhost:8080/api/users/login', {
            method:'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await res.json();
        if(res.ok){
            cookies.set("TOKEN", json.token, { path: '/'});
            cookies.set("EXPIRY", json.expiry, { path: '/'});
            window.location.href = "/";
        }
    }

    const register = async() => {
        const data = { email: email, password: password };
        const res = await fetch('http://localhost:8080/api/users/register', {
            method:'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await res.json();
        if(res.ok){
            cookies.set("TOKEN", json.token, { path: "/"});
            window.location.href = "/";
        }
    }
    return (
        <div className="App">
            <Header/>
            <div className="loginContainer">
            <div className="loginInner">
                <div className="loginOptions">
                    <p className="loginOption" onClick={() => { setAction("Login") }}>Login</p>
                    <p className="loginOption" onClick={() => { setAction("Sign up") }}>Sign up</p>
                </div>
                <h3 className="loginTitle">{ action } </h3>
                <input className="loginInput" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}></input>
                <input className="loginInput" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                {
                    action === "Login" ?
                        <button className="loginButton" onClick={login}>Log In</button>
                    :
                        <button className="loginButton" onClick={register}>Sign Up</button>
                }
            </div>
            </div>
        </div>
    )
};