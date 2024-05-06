import { useState } from "react";
import Swal from "sweetalert2";
import { loginForm } from "../../types/types";

export const Login = ({ setIsAuthenticated }: any) => {
  const adminEmail = "solomon.bunmi@yahoo.com";
  const adminPassword = "12345678";
  const [loginFormData, setLoginFormData] = useState<loginForm>({
    email: "",
    password: "",
  });

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (
      loginFormData.email === adminEmail &&
      loginFormData.password === adminPassword
    ) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem("is_authenticated", JSON.stringify(true));
          setIsAuthenticated(true);

          Swal.fire({
            icon: "success",
            title: "Successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-xs'>
        <form
          onSubmit={handleLogin}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='text-2xl mb-4 text-center'>Admin Login</h1>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              name='email'
              placeholder='admin@example.com'
              value={loginFormData.email}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, email: e.target.value })
              }
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              name='password'
              placeholder='********'
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, password: e.target.value })
              }
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
