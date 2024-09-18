import { conf } from "@/conf/conf";
import { Account, Client, ID } from "appwrite";

class AuthService{
    account;
    client = new Client();

    constructor(){
        this.client
        .setEndpoint(conf.APPWRITE_URI)
        .setProject(conf.APPWRITE_PROJECTID)
        
        this.account = new Account(this.client);
    }

    async Signup(name: string, email: string, password: string) {
        try {
          const userAcc = await this.account.create(
            ID.unique(),
            email,
            password,
            name
          );
          return userAcc
        } catch(err:any) {
          if(err.code === 409) alert("Email id already registered.")
        }
      }
      async Login(email: string, password: string) {
        try {
          return await this.account.createEmailPasswordSession(email, password);
        } catch(err:any) {
          if(err.code === 401) alert("Invalid Email id or password!!")
        }
      }
    
      async getAcc() {
        try {
          return await this.account.get();
        } catch {
          console.log("GetAcc error.");
        }
      }
    
      async Logout() {
        try {
          await this.account.deleteSessions();
        } catch {
          console.log("Logout Error.");
        }
      }
}

export const authService = new AuthService()