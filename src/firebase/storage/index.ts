import { getStorage } from "firebase/storage";
import firebaseApp from "../index";

const storage = getStorage(firebaseApp);

export default storage;