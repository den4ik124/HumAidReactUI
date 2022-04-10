export interface User{
    userName: string;
    // emailProp: string;
    token: string;
    roles : string[] ;
}

export interface UserFormValues{
    password: string;
    confirmPassword?: string;
    tgUserName?: string | null;
}