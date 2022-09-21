import storage from ".";
import {
  UploadTaskSnapshot,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const uploadFile = (
  file: File,
  snapshotWatcher: (snapshot: UploadTaskSnapshot) => void
) => {
  const fileRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);
  uploadTask.on("state_changed", snapshotWatcher);
};
