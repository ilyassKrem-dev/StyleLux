import { loginType, signUpType } from "../types/authTypes";






export const validateLogin = (info:loginType) => {
    const data = {
        success:true,
        errors:{
            email:"",
            password:""
        }
    }
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!regEmail.test(info.email)) {
        data.success = false;
        data.errors.email = "Invalid email"
        return data
    }
    if(info.password.length==0) {
        data.success = false;
        data.errors.password = "Password is required"
        return data
    }
    return data
}

export const validateSignUp = (info:signUpType) => {
    const data = {
        success:true,
        errors:{
            firstname:"",
            lastname:"",
            email:"",
            number:"",
            password:"",
            con_password:""
        }    
    }
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regName = /^\d+$/g;
    const regNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
    if(info.firstname.length===0) {
        data.errors.firstname ="First name is required";
    } else if(regName.test(info.firstname)) {
        data.errors.firstname ="First name  should have no numbers";
    }
    if(info.lastname.length===0) {
        data.errors.lastname ="Last name is required";
    } else if(regName.test(info.lastname)) {
        data.errors.lastname ="Last name should have no numbers";
    }
    if(info.email.length===0) {
        data.errors.email ="Email is required";
    } else if(regEmail.test(info.email)) {
        data.errors.email ="Email is not valid";
    }
    if(info.number.length>0 && regNumber.test(info.email)) {
        data.errors.number ="Phone number must be valid";
    } 
    if(info.password.length==0) {
        data.errors.password ="Password is required";
    } else if (info.password.length<6) {
        data.errors.password ="Password must be more the 6 character";
    } 
    if(info.con_password !== info.password) {
        data.errors.con_password ="Passwords dont match";
    }
    if(data.errors.firstname || data.errors.lastname ||data.errors.email ||data.errors.number ||data.errors.password || data.errors.con_password) data.success = false
    return data
}