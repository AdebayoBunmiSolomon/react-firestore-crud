import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../config/firestore";

export const getImageUrl = () => {
  const useGetImageUrl = async (image: any) => {
    if (image) {
      try {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      } catch (error: any) {
        console.error(error);
        return error.toString();
      }
    } else {
      return null;
    }
  };
  return {
    useGetImageUrl,
  };
};
