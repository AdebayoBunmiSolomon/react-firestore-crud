import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firestore";
import { formData } from "../../types/types";
import { getImageUrl } from "./GetImageUrl";
import { toast } from "react-toastify";

export const AddEmployeeService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { useGetImageUrl, genImgId } = getImageUrl();

  const useAddEmployee = async (data: formData, imgUpload: any) => {
    setLoading(true);
    const downloadedUrl: string = await useGetImageUrl(imgUpload);
    setImageUrl(downloadedUrl);
    data.imageUrl = downloadedUrl;
    data.imageName = genImgId + imgUpload.name;
    setLoading(true);
    try {
      setLoading(true);
      const docRef = query(
        collection(db, "employees"),
        where("email", "==", data.email)
      );
      setLoading(true);
      const docSnap = await getDocs(docRef);
      setLoading(true);
      if (!docSnap.empty) {
        setLoading(false);
        toast("email already taken", {
          type: "error",
          theme: "colored",
        });
      } else {
        await addDoc(collection(db, "employees"), {
          ...data,
        });
        toast("employee data saved successfully", {
          type: "success",
          theme: "colored",
        });
      }
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    useAddEmployee,
    loading,
    imageUrl,
  };
};
