import React from 'react'
import { topMeels } from '../../../Data/topMeels'

const CarouselItem = ({image, title, onClick}) => {
  return (
        <div className='flex flex-col justify-center items-center cursor-pointer hover:opacity-75' onClick={() => onClick(title)}>
            <img className='w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] rounded-full object-cover object-center' src={image} alt={title} />
            <span className='py-2 font-semibold text-sm text-gray-400'>{title}</span>
        </div>
         
    
  )
}

export default CarouselItem