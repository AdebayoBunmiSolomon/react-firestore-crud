import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Header } from "./Header";
import { Table } from "./Table";
import { Add } from "./Add";
import { Edit } from "./Edit";

import { employeesData } from "../../data";

export const Dashboard = ({ setIsAuthenticated }: any) => {
  const [employees, setEmployees] = useState<any>(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedData: string | null = localStorage.getItem("employees_data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (
        typeof parsedData === "object" &&
        Object.keys(parsedData).length > 0
      ) {
        setEmployees(parsedData);
      }
    }
  }, []);

  const handleEdit = (id: any) => {
    const [employee] = employees.filter((employee: any) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id: any) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter(
          (employee: any) => employee.id === id
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(
          (employee: any) => employee.id !== id
        );
        localStorage.setItem("employees_data", JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);
      }
    });
  };

  return (
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
  );
};
