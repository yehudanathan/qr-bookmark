import {
  UploadTaskSnapshot,
  UploadTask,
  getDownloadURL,
} from "firebase/storage";

export const getUploadPercentageFromSnapshot = (
  snapshot: UploadTaskSnapshot
) => {
  const { bytesTransferred, totalBytes } = snapshot;
  return Math.round((bytesTransferred / totalBytes) * 100);
};

export const getUploadStatusFromSnapshot = (snapshot: UploadTaskSnapshot) => {
  const { state } = snapshot;
  switch (state) {
    case "paused":
      return "paused";
    case "running":
      return "uploading";
    case "success":
      return "done";
    default:
      return "error";
  }
};

export const getDownloadURLFromTask = async (uploadTask: UploadTask) => {
  return await getDownloadURL(uploadTask.snapshot.ref)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
};
