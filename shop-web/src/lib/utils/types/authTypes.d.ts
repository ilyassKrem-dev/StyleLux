



export type loginType = {
    email:string;
    password:string;
}

export type signUpType = {
    firstname:string;
    lastname:string;
    email:string;
    number:string;
    password:string;
    con_password:string
}


export type sessionType = {
    id:number;
    firstname:string,
    lastname:string,
    email:string,
    role:string,
    uid:string,
    createdAt:string,
    updatedAt:string
}