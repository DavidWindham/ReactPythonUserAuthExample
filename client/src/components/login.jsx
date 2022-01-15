import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import {login} from '../services/user.service';

function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {user} = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user){
    //         console.log(user);
    //     }
    // }, [user])

    const handleLogin = () => {
        const userObj = {
            username: username,
            password: password
        }
        login(userObj, setLoginSuccess);
    }

    const setLoginSuccess = (userObj) => {
        dispatch(setUser({username: username}))
    }

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Username..." 
                defaultValue={username} 
                onChange={(e) => setUsername(e.target.value)} type="text"
            />
            <input placeholder="Password..." 
                defaultValue={password} 
                onChange={(e) => setPassword(e.target.value)} type="password"
            />
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    )
}

export default LoginComponent;