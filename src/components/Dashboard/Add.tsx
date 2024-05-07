import { useState } from "react";
import Swal from "sweetalert2";
import { IAddProps, formData } from "../../types/types";
import { collection, addDoc } from "firebase/firestore";

export const Add = ({ employees, setEmployees, setIsAdding }: IAddProps) => {
  const [formData, setFormData] = useState<formData>({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  });

  const handleAdd = (e: any) => {
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

    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${formData.firstName} ${formData.lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='flex justify-center items-center h-screen mt-10'>
      <form
        onSubmit={handleAdd}
        className='p-6 bg-white rounded-lg shadow-md w-full max-w-xl'>
        <h1 className='text-2xl font-bold mb-4'>Add Employee</h1>
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
        <label className='block mb-2'>Last Name</label>
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
        <div className='mt-6'>
          <input
            type='submit'
            value='Add'
            className='w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600'
          />
          <input
            style={{ marginLeft: "12px" }}
            className='w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300'
            type='button'
            value='Cancel'
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};
