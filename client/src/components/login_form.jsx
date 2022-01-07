import React from "react";
import { login } from "../services/user.service";

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "example_username",
            password: "example_password",
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value,
        });
    }

    submitUserInfo(){
        const user_obj = {
            "username": this.state.username,
            "password": this.state.password,
        }

        login(user_obj);
    }
    
    render(){
        return (
            <div>
                <h1>Login</h1>
                <input placeholder="Username..." type="text" onChange={this.onChangeUsername} />
                <input placeholder="Password..." type="password" onChange={this.onChangePassword} />
                <button onClick={() => this.submitUserInfo()}>Login</button>
            </div>
        )
    }
}