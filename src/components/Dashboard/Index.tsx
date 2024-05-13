import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Table } from "./Table";
import { Add } from "./Add";
import { Edit } from "./Edit";
import { DeleteEmployee } from "../../firebase/services/DeleteEmployee";
import { ToastContainer } from "react-toastify";
import { GetEmployee } from "../../firebase/services/GetEmployee";

export const Dashboard = ({ setIsAuthenticated }: any) => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { useDeleteEmployee, loading } = DeleteEmployee();
  const { useGetEmployee, employees, setEmployees } = GetEmployee();

  useEffect(() => {
    useGetEmployee();
  }, [employees]);

  const handleEdit = (id: any) => {
    const [employee] = employees.filter((employee: any) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    await useDeleteEmployee(id, imageUrl);
    await useGetEmployee();
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
