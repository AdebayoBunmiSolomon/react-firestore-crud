import { useState } from "react";

export const Table = ({
  employees,
  handleEdit,
  handleDelete,
  loading,
}: any) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const listItem = (employee: any, i: number) => {
    return (
      <tr key={i}>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {i + 1}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {employee && employee.firstName}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {employee && employee.lastName}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {employee && employee.email}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {formatter.format(employee && employee.salary)}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {employee && employee.date}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          <img
            src={employee && employee.imageUrl}
            className='w-16 h-16 rounded-full'
          />
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
          <button
            onClick={() => handleEdit(employee && employee.id)}
            className='text-indigo-600 hover:text-indigo-900'>
            Edit
          </button>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-left text-sm font-medium'>
          <button
            onClick={() => {
              handleDelete(employee.id, employee.imageName);
              setSelectedIndex(i);
            }}
            className='text-red-600 hover:text-red-900'>
            {loading ? (
              selectedIndex === i ? (
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
                "Delete"
              )
            ) : (
              "Delete"
            )}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className='contain-table overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              No.
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              First Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Last Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Salary
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Date
            </th>
            <th scope='col' className='relative px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
            <th scope='col' className='relative px-6 py-3'>
              <span className='sr-only'>Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {employees.length > 0 ? (
            employees.map((employee: any, i: number) => listItem(employee, i))
          ) : (
            <tr>
              <td
                colSpan={8}
                className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
