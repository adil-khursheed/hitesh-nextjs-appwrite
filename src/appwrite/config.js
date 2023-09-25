import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  // create a new record of user inside appwrite
  async createUserAccount({ email, password, name }) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createUserAccount :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
    }
  }

  async isLoggedIn() {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {
      console.log("Appwrite service :: isLoggedIn :: error", error);
    }

    return false;
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
