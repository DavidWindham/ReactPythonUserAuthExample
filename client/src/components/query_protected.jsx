import React from "react";
import { protected_route } from "../services/user.service";


export default class ProtectedButton extends React.Component {
    constructor(props, status_callback){
        super(props);
        this.status_callback = status_callback;
        this.state = {
            buttonColor: "grey"
        }
    }

    callProtectedRoute(){
        this.setButtonNeutral();
        protected_route(this.setButtonSuccess, this.setButtonFail);
    }

    setButtonNeutral = () => {
        this.setState({buttonColor: "grey"});
    }

    setButtonSuccess = () => {
        this.setState({buttonColor: "green"});
        setTimeout(this.setButtonNeutral, 1000);
    }

    setButtonFail = () => {
        this.setState({buttonColor: "red"});
        setTimeout(this.setButtonNeutral, 1000);
    }
    
    render(){
        return (
            <div>
                <h1>Protected</h1>
                <button onClick={() => this.callProtectedRoute()} style={{"backgroundColor": this.state.buttonColor}}>Call Protected Route</button>
            </div>
        )
    }
}