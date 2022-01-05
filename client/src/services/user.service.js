import Axios from "./axios.service";
import TokenStorage from "./token.service";


export const register = (user_obj) =>
    Axios
        .post(
            "register",
            user_obj
        )
        .then((res)=>{
            login(user_obj);
        })
        .catch((error) => {
            console.log("Error caught in register: ", error);
        })

export const login = (user_obj) =>
    Axios
        .post(
                "login", 
                user_obj
            )
        .then((res)=>{
            TokenStorage.storeTokens(res.data);
        })
        .catch((error) => {
            console.log(error);
        })

export const logout = () =>
        Axios
            .post(
                "logout"
            )
            .then((res) => {
                TokenStorage.clear();
            })

export const protected_route = (success_callback, fail_callback) =>
        Axios
            .get(
                "protected",
                { headers: TokenStorage.getAuthentication().headers }
            )
            .then((res) => {
                const status_code = res.status; // If 401, this fails triggering the error catch
                success_callback();
            })
            .catch((error) => {
                console.log("Error on protected route: ", error);
                fail_callback();
            })