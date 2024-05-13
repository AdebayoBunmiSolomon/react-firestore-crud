import { useState } from "react";
import { IAddProps } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import { addEmployee } from "../../Forms/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEmployeeValSchema } from "../../Forms/validationSchema";
import { AddEmployeeService } from "../../firebase/services/AddEmployee";
import { ToastContainer } from "react-toastify";

export const Add = ({ setIsAdding }: IAddProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<addEmployee>({
    mode: "onChange",
    resolver: zodResolver(addEmployeeValSchema),
  });
  const [imgUpload, setImgUpload] = useState<any>("");
  const { useAddEmployee, loading } = AddEmployeeService();

  const handleAdd = async (data: addEmployee) => {
    useAddEmployee(data, imgUpload);
  };

  return (
    <>
      <ToastContainer />
      <div className='flex justify-center items-center h-screen mt-10'>
        <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-xl'>
          <h1 className='text-2xl font-bold mb-4 mt-20'>Add Employee</h1>
          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>First Name</label>
                <input
                  id='firstName'
                  type='text'
                  name='firstName'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.firstName && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>
            )}
            name='firstName'
            defaultValue=''
          />
          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>Last Name</label>
                <input
                  id='lastName'
                  type='text'
                  name='lastName'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.lastName && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
            )}
            name='lastName'
            defaultValue=''
          />
          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>Email</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.email && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            )}
            name='email'
            defaultValue=''
          />
          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>Salary ($)</label>
                <input
                  id='salary'
                  type='text'
                  name='salary'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.salary && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.salary?.message}
                  </p>
                )}
              </div>
            )}
            name='salary'
            defaultValue=''
          />
          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>Date of Employment</label>
                <input
                  id='date'
                  type='date'
                  name='date'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.date && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.date?.message}
                  </p>
                )}
              </div>
            )}
            name='date'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <div className='mb-2'>
                <label className='block mb-2'>Upload File</label>
                <input
                  id='file'
                  type='file'
                  accept='image/*'
                  defaultValue={field.value}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target) {
                      const selectedFile = target.files?.[0];
                      field.onChange(selectedFile?.name);
                      setImgUpload(selectedFile);
                    }
                  }}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                />
                {errors.imageName && (
                  <p className='text-sm font-medium text-[crimson]'>
                    {errors?.imageName?.message}
                  </p>
                )}
              </div>
            )}
            name='imageName'
            defaultValue=''
          />
          <div className='mt-6'>
            <button
              onClick={handleSubmit(handleAdd)}
              className='w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600'>
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
                "Add"
              )}
            </button>
            <input
              className='w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300'
              type='button'
              value='Cancel'
              onClick={() => setIsAdding(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
