import { tablesDB } from "./appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID } from "./environment";

export async function getLinks() {
    const links = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID as string,
        tableId: APPWRITE_TABLE_ID as string,
    });
    console.log(links);
}
