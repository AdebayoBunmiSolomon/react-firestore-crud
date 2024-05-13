import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firestore";

export const GetEmployee = () => {
  const [employees, setEmployees] = useState<any>([]);
  const useGetEmployee = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmployees(employees);
  };

  return {
    employees,
    setEmployees,
    useGetEmployee,
  };
};
