import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Table } from "./Table";
import { Add } from "./Add";
import { Edit } from "./Edit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config/firestore";
import { DeleteEmployee } from "../../firebase/services/DeleteEmployee";
import { ToastContainer } from "react-toastify";

export const Dashboard = ({ setIsAuthenticated }: any) => {
  const [employees, setEmployees] = useState<any>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { useDeleteEmployee, loading } = DeleteEmployee();

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEmployees(employees);
  };

  useEffect(() => {
    getEmployees();
  }, [employees]);

  const handleEdit = (id: any) => {
    const [employee] = employees.filter((employee: any) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    await useDeleteEmployee(id, imageUrl);
  };

  return (
    <>
      <ToastContainer />
      <div className='container mx-auto px-4'>
        {!isAdding && !isEditing && (
          <>
            <Header
              setIsAdding={setIsAdding}
              setIsAuthenticated={setIsAuthenticated}
            />
            <Table
              employees={employees}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
            />
          </>
        )}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </>
  );
};
