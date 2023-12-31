import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../actions/auth'
import {useTranslation} from 'react-i18next'

const ResetPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [password, setPassword] = useState()
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!password){
        alert(t('pasWarn'));
    }
    else{
        dispatch(resetPassword({password, id, token}, navigate));
    }
  }
  return (
    <div className='main'>
        <div className="container">
            <h4 className='title'>{t('resPass')}</h4>
            <div className="container-2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">
                        <h4>{t('newPass')}</h4>
                    </label>
                    <input type="password" placeholder={t('newPassDesc')} id='password' className='password-input' autoComplete='off' onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit' className='submit-btn'>{t('ch')}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword