import React from 'react'
import RestaurantCard from '../../components/RestarentCard/RestaurantCard'
import { useSelector } from 'react-redux'

const Favorite = () => {
  const {auth}=useSelector(store=>store);

  return (
   <div>
    <h1 className='pt-6 pb-4 text-xl font-semibold text-center'>My Favorites</h1>
    <div className='grid grid-cols-2 gap-12 px-8 max-w-[42rem] mx-auto'>
      {auth.favorites?.map((item) => (
        <div key={item.id} className="flex justify-center">
          <RestaurantCard data={item} />
        </div>
      ))}
    </div>
   </div>
  )
}

export default Favorite