import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService {
    client =  new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client)
    }

    // make create account method
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email, 
                password, 
                name
            )

            if (userAccount) {
                // call another method
                return this.login(email, password)
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // make signin method
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // make getCurrentUser Method
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
           console.log("appwrite error in get current user::",error);
        }

        return null;
    }

    // make logout method
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;