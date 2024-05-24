import { useState } from "react";
import { formData } from "../../types/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { toast } from "react-toastify";
import { DeleteImageUrl } from "./DeleteImageUrl";
import { getImageUrl } from "./GetImageUrl";

export const EditEmployeeService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { useDeleteImageUrl } = DeleteImageUrl();
  const { useGetImageUrl, genImgId } = getImageUrl();

  const deleteToUpdateImg = async (newImgUpload: any, oldImgName: string) => {
    const isImgDeleted = await useDeleteImageUrl(oldImgName);
    console.log("image deleted:", isImgDeleted);
    if (isImgDeleted) {
      const newImgUrl: string = await useGetImageUrl(newImgUpload);
      return {
        newImgUrl: newImgUrl,
        newImgName: genImgId + newImgUpload.name,
      };
    } else {
      return {
        newImgUrl: oldImgName,
        newImgName: "",
      };
    }
  };

  const useEditEmployee = async (
    data: formData,
    id: string,
    oldImgName: string,
    newImgUpload: any
  ) => {
    setLoading(true);
    const { newImgName, newImgUrl } = await deleteToUpdateImg(
      newImgUpload,
      oldImgName
    );
    data.imageName = newImgName;
    data.imageUrl = newImgUrl;
    console.log("New image url:", oldImgName);
    try {
      setLoading(true);
      await setDoc(doc(db, "employees", id), {
        ...data,
      });
      toast("Data edited successfully", {
        type: "success",
        theme: "colored",
      });
    } catch (err: any) {
      console.log(err);
      toast("Error editing form data", {
        type: "error",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    useEditEmployee,
    loading,
  };
};
