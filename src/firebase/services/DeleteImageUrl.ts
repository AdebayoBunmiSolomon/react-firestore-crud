import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firestore";

export const DeleteImageUrl = () => {
  const useDeleteImageUrl = async (imageUrl: string) => {
    const imageRef = ref(storage, `images/${imageUrl}`);
    await deleteObject(imageRef)
      .then(() => {
        console.log("image deleted successfully");
      })
      .catch((error: any) => {
        console.log("Error occurred: ", error);
      });
  };

  return {
    useDeleteImageUrl,
  };
};
