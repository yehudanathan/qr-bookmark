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
        const idList = Object.keys(links);
        const linkList = Object.values(links);
        let linkIndex = 0;

        const result = linkList.map((value, index) => { 
            if (value.URL === link.URL) {
                linkIndex = index;
                return idList[index];
            }
        })[linkIndex];
        return result;
    }
}

export const deleteLinks = async (linkArray: any[]) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);

        linkArray.forEach(async (link) => {
            const id : any = await getLinkID(link);
            const newLink = {[id] : link};
            update(dbRef, newLink);
        });

        return true;
    }
    return null;
}