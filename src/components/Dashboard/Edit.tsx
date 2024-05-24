import { useState } from "react";
import { formData } from "../../types/types";
import { EditEmployeeService } from "../../firebase/services/EditEmployee";
import { ToastContainer } from "react-toastify";

export const Edit = ({
  // employees,
  selectedEmployee,
  // setEmployees,
  setIsEditing,
}: any) => {
  const { useEditEmployee, loading } = EditEmployeeService();
  const [imgUpload, setImgUpload] = useState<any>("");
  const id = selectedEmployee.id;
  const [formData, setFormData] = useState<formData>({
    firstName: selectedEmployee.firstName,
    lastName: selectedEmployee.lastName,
    email: selectedEmployee.email,
    salary: selectedEmployee.salary,
    date: selectedEmployee.date,
    imageUrl: selectedEmployee.imageUrl,
    imageName: selectedEmployee.imageName,
  });

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const oldImgName = formData.imageName;
    useEditEmployee(formData, id, oldImgName, imgUpload);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex justify-center items-center h-screen mt-10'>
        <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-xl'>
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500'
          />
          <label className='block mb-2'>Salary ($)</label>
          <input
            id='salary'
            type='number'
            name='salary'
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
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
          <div className='mb-2'>
            <label className='block mb-2'>Upload File</label>
            <input
              id='file'
              type='file'
              accept='image/*'
              defaultValue={imgUpload.name}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target) {
                  const selectedFile = target.files?.[0];
                  setImgUpload(selectedFile);
                }
              }}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={handleUpdate}
              className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'>
              {loading ? (
                <svg
                  aria-hidden='true'
                  className='inline w-6 h-6 mr-2 text-gray-200 animate-spin fill-white'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              ) : (
                "Update"
              )}
            </button>
            <input
              style={{ marginLeft: "12px" }}
              className='bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer'
              type='button'
              value='Cancel'
              onClick={() => setIsEditing(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
