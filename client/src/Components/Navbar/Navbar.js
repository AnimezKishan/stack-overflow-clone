import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'

import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../Components/Avatar/Avatar'


const Navbar = () => {
  
    var User = useSelector((state) => (state.currentUserReducer))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token;
        if(token){
            const decodeToken = decode(token);
            if(decodeToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch])

    return (
    <nav className='main-nav'>
        <div className='navbar hidden-1'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt="logo" />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type="text" placeholder='Search...'/>
                <img src={search} alt="search" width="18" className='nav-search'/>
            </form>
            {
                User === null 
                ?
                <Link to='/Auth' className='nav-item nav-links'>Log in</Link>
                :
                <>
                    <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%'><Link to={`/User/${User.result._id}`} style={{color:"white", textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar> 
                    <button className='nav-item nav-links' style={{cursor: "pointer"}} onClick={handleLogout}>Log out</button>
                </>
            }
        </div>
        <div className='nav hidden-2'>
            <div class="logo-container nav-item nav-logo">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <input class="hidden" type="checkbox" id="menuToggle"/>
                <label class="menu-btn" for="menuToggle">
                    <div class="menu"></div>
                    <div class="menu"></div>
                    <div class="menu"></div>
            </label>
            <div className='nav-container'>
                <div className='nav-tabs'>
                    <div className='nav-content'>
                        <Link to='/' className='nav-item nav-btn'>About</Link>
                        <Link to='/' className='nav-item nav-btn'>Products</Link>
                        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                        <form className='search-form'>
                            <input type="text" placeholder='Search...'/>
                            <img src={search} alt="search" width="18" className='nav-search'/>
                        </form>
                        <div className='auth-nav'>
                            {
                                User === null 
                                ?
                                <Link to='/Auth' className='nav-item nav-links'>Log in</Link>
                                :
                                <>
                                    <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%'><Link to={`/User/${User.result._id}`} style={{color:"white", textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar> 
                                    <button className='nav-item nav-links' style={{cursor: "pointer"}} onClick={handleLogout}>Log out</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar