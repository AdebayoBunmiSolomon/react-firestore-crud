import { useState } from "react";
import Swal from "sweetalert2";
import { formData } from "../../types/types";

export const Edit = ({
  employees,
  selectedEmployee,
  setEmployees,
  setIsEditing,
}: any) => {
  const id = selectedEmployee.id;
  const [formData, setFormData] = useState<formData>({
    firstName: selectedEmployee.firstName,
    lastName: selectedEmployee.lastName,
    email: selectedEmployee.email,
    salary: selectedEmployee.salary,
    date: selectedEmployee.date,
  });

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.salary ||
      !formData.date
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      formData: formData,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem("employees_data", JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${employee.formData.firstName} ${employee.formData.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='flex justify-center items-center h-screen mt-10'>
      <form
        onSubmit={handleUpdate}
        className='p-6 bg-white rounded-lg shadow-md w-full max-w-xl'>
        <h1 className='text-2xl font-bold mb-4'>Edit Employee</h1>
        <label className='block mb-2'>First Name</label>
        <input
          id='firstName'
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Salary ($)</label>
        <input
          id='salary'
          type='number'
          name='salary'
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <div style={{ marginTop: "30px" }}>
          <input
            type='submit'
            value='Update'
            className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
          />
          <input
            style={{ marginLeft: "12px" }}
            className='bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
            type='button'
            value='Cancel'
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
