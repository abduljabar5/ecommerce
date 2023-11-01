import React from 'react'

const Hero = () => {
  return (
    <div className="rounded-lg mx-10 items-center [h-90vh] bg-center bg-cover" style={{ backgroundImage: `url(https://media.istockphoto.com/id/990697446/vector/gray-abstract-background.jpg?s=612x612&w=0&k=20&c=vO8a_dlQnyjvQxpnyKR9w5S9166pdAUrwnPg_P5zQ3k=)` }}>
      <div className='flex sm:flex-row md:flex-row flex-col m-24 py-24 justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <p>Special offer</p>
          <p className='text-6xl font-bold'>Halloween Sale</p>
          <p className='text-lg font-extralight'>Save up to 70% on select items</p>
          <button className="py-2 mb-auto mt-12 px-6 sm:py-3 sm:px-8 md:py-4 md:px-12 lg:py-5 lg:px-16 w-1/2 border border-white text-black hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-lg">
            Shop Now
          </button>
        </div>
        <img className='w-[500px] rounded-full my-12' src='https://img.freepik.com/free-photo/fashion-shoes-sneakers_1203-7529.jpg?w=1800&t=st=1697129000~exp=1697129600~hmac=0c12d52b7570532ac554516a71745636de9dbb4fdc507784da9bab9f986c2c3c'></img>

      </div>

    </div>
  )
}

export default Hero