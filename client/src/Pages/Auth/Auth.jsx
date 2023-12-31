import React, {useEffect, useState} from 'react'
import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login, loginInfo } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import { fetchAllUsers } from '../../actions/users'

const Auth = () => {
  
  const [browser, setBrowser] = useState(navigator.userAgentData?.brands[0]?.brand);
  const [os, setOs] = useState(navigator.userAgentData?.platform);
  const deviceCheck = navigator.userAgentData?.mobile ? 'Mobile' : 'Desktop/Laptop';
  const [device, setDevice] = useState(deviceCheck);
  const [ip, setIp] = useState();
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setIp(data.ip))
  })

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleSwitch = () =>{
    setIsSignup(!isSignup);
  }

  const handleSubmit = (detail) => {
    detail.preventDefault();

    if(!email && !password){
      alert('Enter a email and password to continue')
    }
    if(isSignup){
      if(!name){
        alert('Enter a name to continue')
      }
      dispatch(signup({name, email, password}, navigate))
    }
    else{
      dispatch(loginInfo({ email, browser, os, device, ip }));
      dispatch(login({email, password}, navigate))
      dispatch(fetchAllUsers);
    }
  }

  return (
      <section className='auth-section'>
        { isSignup && <AboutAuth/> }
        <div className='auth-container-2'>
          { !isSignup && <img src={icon} alt='stack-overflow' className='login-logo'/> }
          <form onSubmit={handleSubmit}>
            {
              isSignup && (
                <label htmlFor="name">
                  <h4>{t('dName')}</h4>
                  <input type="text" name='name' id='name' onChange={(detail) => {setName(detail.target.value)}}/>
                </label>
              )
            }
            <label htmlFor="email">
              <h4>{t('email')}</h4>
              <input type="email" name='email' id='email' onChange={(detail) => {setEmail(detail.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4>{t('password')}</h4>
                { !isSignup && <NavLink to='/ForgotPassword' style={{color: "#007ac6", fontSize: "13px", marginTop: "11px", textDecoration: "none"}}>{t('forgotP')}</NavLink> }
              </div>
              <input type="password" name='password' id='password' onChange={(detail) => {setPassword(detail.target.value)}}/>
              { isSignup && <p style={{color: "#666767", fontSize: "13px"}}>{t('passD1')} <br />{t('passD2')} <br /> {t('passD3')}</p> }
            </label>
            { isSignup && (
              <label htmlFor="check">
                <input type="checkbox" id='check'/>
                <p style={{fontSize: "13px"}}>{t('opt1')} <br />{t('opt2')} <br />{t('opt3')}</p>
              </label>
            )}
            <button type='submit' className='auth-btn'>{ isSignup ? `${t('signup')}` : `${t('login')}`}</button>
            {
              isSignup && (
                <p style={{color: "#666767", fontSize: "13px"}}>{t('des1')} <a href='https://stackoverflow.com/legal/terms-of-service/public' style={{color:"#007ac6", textDecoration:"none"}}>{t('des2')} <br />{t('des3')}</a>, <a href='https://stackoverflow.com/legal/privacy-policy' style={{color:"#007ac6", textDecoration:"none"}}>{t('des4')}</a> {t('des5')} <a href='https://stackoverflow.com/conduct' style={{color:"#007ac6", textDecoration:"none"}}>{t('des6')}</a></p>
              )
            }
          </form>
          <p>
            {isSignup ? `${t('already')}` : `${t('dontA')}`}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? `${t('login')}` : `${t('signup')}`}</button>
          </p>
        </div>
      </section>
  )
}

export default Auth