import React from 'react'
import './ForgotPassword.css'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!email){
        alert(t('emailWarn'));
    }
    else{
        dispatch(forgotPassword({email}, navigate));
    }
  }

  return (
    <div className='main'>
        <div className="container">
            <h4 className='title'>{t('forgotPass')}</h4>
            <div className="container-2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <h4>{t('email')}</h4>
                    </label>
                    <input type="email" placeholder={t('emlDesc')} id='email' className='email-input' autoComplete='off' onChange={(e) => setEmail(e.target.value)}/>
                    <p className='desc'>{t('forgotPassDesc')}</p>
                    <button type='submit' className='submit-btn'>{t('snd')}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword