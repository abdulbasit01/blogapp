import conf from "../../conf/conf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // return userAccount
                return this.login({ email, password })
            } return userAccount
        } catch (error) {
            throw error
        }
    }
    async login({ email, password }) {
        try {
            const userData = await this.account.createEmailSession(email, password)
            return userData;
        } catch (error) {
            throw error
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
    async getCurrentUserSession() {
        try {
            const user = await this.account.get()
            console.log(user);
            return user;
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService()

export default authService