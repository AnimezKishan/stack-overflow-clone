import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import Location from '../../Components/Location/Location'
import { useTranslation } from 'react-i18next'

const UserLocation = () => {

  const {t} = useTranslation();

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
          <h1 style={{fontWeight: "400"}}>{t('yourLocation')}</h1>
          <div className='location-div'>
            <Location/>
          </div>
        </div>
    </div>
  )
}

export default UserLocation