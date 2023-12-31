import React from 'react'
import './Subscription.css'
import { useDispatch, useSelector } from 'react-redux'
import { UseSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import { addPro, addAce } from '../../actions/users'
import {useTranslation} from 'react-i18next'

const Subscription = () => {

  const User = useSelector((state) => (state.currentUserReducer));
  const userId = User.result._id;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePro = () => {
    dispatch(addPro({ userId }, navigate));
  }

  const handleAce = () => {
    dispatch(addAce({ userId }, navigate));
  }

  return (
    <div className='subscription-main'>
        <div className='pro'>
          <h3>{t('expoPR')}</h3>
          <h4>₹100</h4>
          <p>{t('expoPRDesc')}</p>
          <button><a href="https://buy.stripe.com/test_14k7sG9Mo3gB7e06oo" target='_blank' onClick={handlePro}>Buy</a></button>
        </div>
        <div className='ace'>
          <h3>{t('expoAC')}</h3>
          <h4>₹1000</h4>
          <p>{t('expoACDesc')}</p>
          <button><a href="https://buy.stripe.com/test_4gw28m3o02cxeGsfYZ" target='_blank' onClick={handleAce}>Buy</a></button>
        </div>
    </div>
  )
}

export default Subscription