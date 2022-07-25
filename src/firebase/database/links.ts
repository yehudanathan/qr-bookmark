import { getDatabase, ref, query, equalTo, get, push, orderByChild, QueryConstraint } from 'firebase/database';
import firebaseApp from '../index';
import { getUser } from '../auth/auth_user';
import { Link } from '../../models/Link';

const database = getDatabase(firebaseApp);
const basePath = 'links';

export const getLinks = (options: QueryConstraint[] = []) => {
    const user = getUser();
    if (user) {
        const userPath = `${basePath}/${user.uid}`;
        const dbRef = ref(database, userPath);
        return get(query(dbRef, ...options)).then(snapshot => snapshot.val() as Link[]) as Promise<Link[]>;
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