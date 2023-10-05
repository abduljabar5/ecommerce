import React from 'react'

const Loading = () => {
  return (
    <div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="animate-pulse bg-gray-300 p-4 rounded-md">
        <div className="h-32 bg-gray-200 rounded-md"></div>
        <div className="mt-4 h-4 bg-gray-200 rounded-md"></div>
        <div className="mt-2 h-4 bg-gray-200 w-3/4 rounded-md"></div>
        <div className="mt-3 h-6 bg-gray-200 w-1/2 rounded-md"></div>
      </div>
    ))}
  </div></div>
  )
}

export default Loading