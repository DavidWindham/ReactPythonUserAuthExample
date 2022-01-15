import React from "react";
import { useSelector } from "react-redux";


function UserStateComponent() {
    const {user} = useSelector(state => state.userReducer);

    return (
        <div>
            {user
                ? (<h1>User is logged in, {user.username}</h1>)
                : <h1>User is not logged in</h1>
            }
        </div>
    )
}

export default UserStateComponent;