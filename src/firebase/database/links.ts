import { getDatabase, ref, query, equalTo, get, push, orderByChild, QueryConstraint, update } from 'firebase/database';
import firebaseApp from '../index';
import { getUser } from '../auth/auth_user';
import { Link } from '../models/Link';

const database = getDatabase(firebaseApp);
const basePath = 'links';

export const getLinks = (options: QueryConstraint[] = []) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);
        return get(query(dbRef, ...options)).then(snapshot => snapshot.val() as {[id: string]: Link}) as Promise<{[id: string]: Link}>;
    }
    return null;
}

export const orderByTime = orderByChild('createdAt');
export const orderByTitle = orderByChild('title');
export const orderByUrl = orderByChild('url');
export const filterByFavorite = equalTo(true, 'favorite');

// getLinks() sort by default
// getLinks(orderByTime) sort by time
// getLinks(filterByFavorite) filtered by favorite
// getLinks(orderByTime, filterByFavorite) sort then filter

export const pushLink = (link: Link) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);
        return push(dbRef, link);
    }
    return null;
}

export const getLinkID = async (link) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);
        const links = await get(query(dbRef)).then(snapshot => snapshot.val() as {[id: string]: Link});
        // console.log("🚀 ~ file: links.ts ~ line 45 ~ getLinkID ~ links", links)

        const idList = Object.keys(links);
        // console.log("🚀 ~ file: links.ts ~ line 48 ~ getLinkID ~ idList", idList)
        const linkList = Object.values(links);
        // console.log("🚀 ~ file: links.ts ~ line 50 ~ getLinkID ~ linkList", linkList)
        let linkIndex = 0;
        const result = linkList.map((value, index) => { 
            // console.log("🚀 ~ file: links.ts ~ line 54 ~ result ~ JSON.stringify(value)", JSON.stringify(value))
            // console.log("🚀 ~ file: links.ts ~ line 55 ~ result ~ JSON.stringify(link)", JSON.stringify(link))
            if (value.URL === link.URL) {
                // console.log("gotcha!")
                linkIndex = index;
                return idList[index];
            }
        })[linkIndex];
        // console.log("🚀 ~ file: links.ts ~ line 57 ~ result ~ result", result)
        return result;
    }
}

export const deleteLinks = async (linkArray: any[]) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);

        linkArray.forEach(async (link) => {
            // console.log("🚀 ~ file: links.ts ~ line 68 ~ linkArray.forEach ~ link", link)
            const id : any = await getLinkID(link);
            console.log("🚀 ~ file: links.ts ~ line 65 ~ linkArray.forEach ~ id", id)
            const newLink = {[id] : link};
            update(dbRef, newLink);
        });

        return true;
    }
    return null;
}