export const Table = ({ employees, handleEdit, handleDelete }: any) => {
  employees.forEach((employee: any, i: number) => {
    employee.id = i + 1;
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

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
            employees.map((employee: any, i: number) => (
              <tr key={employee.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {i + 1}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {employee.firstName}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {employee.lastName}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {employee.email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {formatter.format(employee.salary)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {employee.date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className='text-indigo-600 hover:text-indigo-900'>
                    Edit
                  </button>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left text-sm font-medium'>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className='text-red-600 hover:text-red-900'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
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
