import React from 'react'

const CarouselItem = ({ image, title, onClick }) => {
  return (
    <div
      className='flex flex-col justify-center items-center cursor-pointer group'
      onClick={() => onClick(title)}
    >
      <div className="rounded-full overflow-hidden w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] border-2 border-transparent group-hover:border-[#e91e63] transition-all">
        <img
          className='w-full h-full object-cover object-center'
          src={image}
          alt={title}
        />
      </div>
      <span className='py-2 font-medium text-sm text-gray-700 group-hover:text-[#e91e63] transition-colors'>{title}</span>
    </div>
  )
}

export default CarouselItem
