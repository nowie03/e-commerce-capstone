import jwt from "jwt-decode";

export function checkAllTrue(...args){
    for (let i = 0; i < args.length; i++) {
       if(args[i]==false)return false;
      }
      return true;
}

export function getUserId(){
    var user= jwt(localStorage.getItem('token'));
    return user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]
}