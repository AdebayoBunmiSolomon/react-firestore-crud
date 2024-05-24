import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firestore";

export const DeleteImageUrl = () => {
  const useDeleteImageUrl = async (imageName: string): Promise<boolean> => {
    const imageRef = ref(storage, `images/${imageName}`);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      return true;
    } catch (error) {
      console.log("Error occurred: ", error);
      return false;
    }
  };

  return {
    useDeleteImageUrl,
  };
};
