import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firestore";
import { formData } from "../../types/types";
import { getImageUrl } from "./GetImageUrl";

export const AddEmployeeService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { useGetImageUrl } = getImageUrl();

  const useAddEmployee = async (data: formData, imgUpload: any) => {
    setLoading(true);
    const downloadedUrl: string = await useGetImageUrl(imgUpload);
    setImageUrl(downloadedUrl);
    data.imageUpload = downloadedUrl;
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
        console.log("Email already taken");
      } else {
        await addDoc(collection(db, "employees"), {
          ...data,
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
