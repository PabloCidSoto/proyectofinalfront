import { TOKEN } from "../utils/constants"
import jwtDecode from "jwt-decode";

export function setToken(token){
    localStorage.setItem(TOKEN, token)
}

export function getToken(){
    return localStorage.getItem(TOKEN)
}

export function removeToken(){
    localStorage.removeItem(TOKEN);
}

export function hasExpiredtoken(token){
    const tokenDecode = jwtDecode(token);
    const expiredDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();

    if(currentDate > expiredDate){
        return true;
    }
    
    return false;

}