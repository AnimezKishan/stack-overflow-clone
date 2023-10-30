import React from 'react'
import '../../App.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import HomeMainBar from '../../Components/HomeMainBar/HomeMainBar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'

export const Home = () => {
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
          <HomeMainBar/>
          <RightSidebar/>
        </div>
    </div>
  )
}
