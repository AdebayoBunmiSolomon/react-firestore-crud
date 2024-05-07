import { useState } from "react";
import Swal from "sweetalert2";
import { IAddProps, formData } from "../../types/types";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firestore";

export const Add = ({ employees, setEmployees, setIsAdding }: IAddProps) => {
  const [formDataVal, setFormDataVal] = useState<formData>({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      if (
        !formDataVal.firstName ||
        !formDataVal.lastName ||
        !formDataVal.email ||
        !formDataVal.salary ||
        !formDataVal.date
      ) {
        throw new Error("All fields are required.");
      } else {
        const docRef = query(
          collection(db, "employees"),
          where("email", "==", formDataVal.email)
        );
        const docSnap = await getDocs(docRef);
        if (!docSnap.empty) {
          throw new Error("Email already taken");
        } else {
          await addDoc(collection(db, "employees"), {
            ...formDataVal,
          });
          Swal.fire({
            icon: "success",
            title: "Added!",
            text: `${formDataVal.firstName} ${formDataVal.lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
        showConfirmButton: true,
      });
    } finally {
      setEmployees(employees);
      setIsAdding(false);
    }
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
          value={formDataVal.firstName}
          onChange={(e) =>
            setFormDataVal({ ...formDataVal, firstName: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Last Name</label>
        <input
          id='lastName'
          type='text'
          name='lastName'
          value={formDataVal.lastName}
          onChange={(e) =>
            setFormDataVal({ ...formDataVal, lastName: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          value={formDataVal.email}
          onChange={(e) =>
            setFormDataVal({ ...formDataVal, email: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Salary ($)</label>
        <input
          id='salary'
          type='number'
          name='salary'
          value={formDataVal.salary}
          onChange={(e) =>
            setFormDataVal({ ...formDataVal, salary: e.target.value })
          }
          className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label className='block mb-2'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          value={formDataVal.date}
          onChange={(e) =>
            setFormDataVal({ ...formDataVal, date: e.target.value })
          }
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
