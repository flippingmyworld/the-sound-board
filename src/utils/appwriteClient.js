import { Client, Databases, Account, Storage, ID } from "appwrite";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "6488334b73906c5bdbb6";
export const APPWRITE_TOKEN_KEY =
  "8fd7f1ac1b0cad4dca2e0c47f1b41aa98744c82cef4591bbf42c9f36704393cd680802d968257c7d817ab7d07e6fcca4f170e2f4d248f5699307087cf4d14a537b68f7823efa469c12d8cdee1b23705ce5bb15633b3deb89690bafd2e44fbbd79a6a1083e067d4e6080bf7b01c1a994b61860e70e491606abd2ee2dc38b1ff8c";

const appwriteClient = new Client();
appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for client side authentication
// const cookies = nookies.get();
// const appwriteJWT = cookies[APPWRITE_TOKEN_KEY];
// if (appwriteJWT) {
//   appwriteClient.setJWT(appwriteJWT);
// }

const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const databases = new Databases(appwriteClient);

export { appwriteClient, account, storage, databases, ID };
