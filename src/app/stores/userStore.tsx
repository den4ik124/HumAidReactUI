import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";

export default class UserStore{
    user: User | null = null;
    users: User[] | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    register = async (creds: UserFormValues) => {
        try{
            console.log(creds);

            const user = await agent.Account.register(creds);

            runInAction(() => this.user = user)
            history.push('/');
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            runInAction(() => this.user = user);
            history.push('/');
        } catch(error){
            throw error;
        }
    }
    
    googleLogin = async () => {
        try{
            const user = await agent.Account.googleLogin();
            console.log(user);
            history.push('/');
        } catch(error){
            throw error;
        }
    }
    googleLoginTest = async (tokenId : string) => {
        try{
            const user = await agent.Account.googleLoginTest(tokenId);
            console.log(user);
        } catch(error){
            throw error;
        }
    }

    logout = async () => {
        await agent.Account.logout();
        history.push('/')
        runInAction(() => this.user = null);
    };

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            console.log("RESPONSE :\n" + user.userName);
            // console.log(user);
            runInAction(()=>{
                this.user = user;
            });
        }catch (error){
            console.log(error);
            throw error;

        }
    }

    getUsers = async () => {
        try{
            const users = await agent.Users.list();
            // console.log(users);
            runInAction(()=>this.users = users);
        }catch (error){
            console.log(error);
        }
    }
}
