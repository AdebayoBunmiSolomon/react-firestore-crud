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

  const updateImg = async (newImgUpload: any, oldImgUrl: string) => {
    const isImgDeleted = await useDeleteImageUrl(oldImgUrl);
    if (isImgDeleted) {
      const newImgUrl: string = await useGetImageUrl(newImgUpload);
      return {
        newImgUrl: newImgUrl,
        newImgName: genImgId + newImgUpload.name,
      };
    } else {
      return {
        newImgUrl: "",
        newImgName: "",
      };
    }
  };

  const useEditEmployee = async (
    data: formData,
    id: string,
    oldImgUrl: string,
    newImgUpload: any
  ) => {
    setLoading(true);
    const { newImgName, newImgUrl } = await updateImg(newImgUpload, oldImgUrl);
    data.imageName = newImgName;
    data.imageUrl = newImgUrl;
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
function firestore() {
  throw new Error("Function not implemented.");
}
