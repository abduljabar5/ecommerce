import React from 'react';

const TableLoader = () => {
  return (
    <div className="min-w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(7)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-7 bg-gray-300 animate-pulse rounded-2xl"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-7 bg-gray-300 animate-pulse rounded-2xl"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-7 bg-gray-300 animate-pulse rounded-2xl"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-7 bg-gray-300 animate-pulse rounded-2xl"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-7 bg-gray-300 animate-pulse rounded-2xl"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLoader;
