import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firestore";
import { toast } from "react-toastify";
import { DeleteImageUrl } from "./DeleteImageUrl";

export const DeleteEmployee = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { useDeleteImageUrl } = DeleteImageUrl();

  const useDeleteEmployee = async (employeeId: string, imageUrl: string) => {
    setLoading(true);
    try {
      setLoading(true);
      await useDeleteImageUrl(imageUrl);
      await deleteDoc(doc(db, "employees", employeeId));
      setLoading(false);
      toast("data deleted successfully", {
        type: "success",
        theme: "colored",
      });
    } catch (err: any) {
      console.log(err);
      toast(err, {
        type: "success",
        theme: "colored",
      });
      setLoading(false);
    } finally {
    }
  };

  return {
    useDeleteEmployee,
    loading,
  };
};
