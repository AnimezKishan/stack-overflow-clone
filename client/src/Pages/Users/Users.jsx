import React from 'react'
import { useLocation } from 'react-router-dom'
import {useTranslation} from "react-i18next"

import './Users.css'
import UsersList from './UsersList'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'

const Users = () => {

  const location = useLocation();
  const {t} = useTranslation();

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
          <h1 style={{fontWeight: "400"}}>{t('users')}</h1>
          <UsersList/>
        </div>
    </div>
  )
}

export default Users