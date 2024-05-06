import { Logout } from "../Logout/Logout";

export const Header = ({ setIsAdding, setIsAuthenticated }: any) => {
  return (
    <header className='bg-gray-900 text-white py-4 px-6'>
      <h1 className='text-2xl font-bold'>Employee Management Software</h1>
      <div className='flex justify-between items-center mt-6'>
        <button
          onClick={() => setIsAdding(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'>
          Add Employee
        </button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};
