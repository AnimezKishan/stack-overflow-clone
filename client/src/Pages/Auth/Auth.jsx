import React, {useState} from 'react'
import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () =>{
    setIsSignup(!isSignup);
  }

  const handleSubmit = (detail) => {
    detail.preventDefault()

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
      dispatch(login({email, password}, navigate))
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
                  <h4>Display Name</h4>
                  <input type="text" name='name' id='name' onChange={(detail) => {setName(detail.target.value)}}/>
                </label>
              )
            }
            <label htmlFor="email">
              <h4>Email</h4>
              <input type="email" name='email' id='email' onChange={(detail) => {setEmail(detail.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4>Password</h4>
                { !isSignup && <p style={{color: "#007ac6", fontSize: "13px"}}>Forgot Password?</p> }
              </div>
              <input type="password" name='password' id='password' onChange={(detail) => {setPassword(detail.target.value)}}/>
              { isSignup && <p style={{color: "#666767", fontSize: "13px"}}>Passwords must contain at least eight <br />characters, including at least 1 letter and 1 <br /> number.</p> }
            </label>
            { isSignup && (
              <label htmlFor="check">
                <input type="checkbox" id='check'/>
                <p style={{fontSize: "13px"}}>Opt-in to receive occasional <br />product updates, user research invitations, <br />company announcements, and digests.</p>
              </label>
            )}
            <button type='submit' className='auth-btn'>{ isSignup ? 'Sign Up' : 'Log In'}</button>
            {
              isSignup && (
                <p style={{color: "#666767", fontSize: "13px"}}>By clicking “Sign up”, you agree to our <a href='https://stackoverflow.com/legal/terms-of-service/public' style={{color:"#007ac6", textDecoration:"none"}}>terms of <br />service</a>, <a href='https://stackoverflow.com/legal/privacy-policy' style={{color:"#007ac6", textDecoration:"none"}}>privacy policy</a> and <a href='https://stackoverflow.com/conduct' style={{color:"#007ac6", textDecoration:"none"}}>cookie policy</a></p>
              )
            }
          </form>
          <p>
            {isSignup ? 'Already have an Account?' : "Don't have an Account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? 'Log In' : 'Sign Up'}</button>
          </p>
        </div>
      </section>
  )
}

export default Auth