import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import { Questions } from './Pages/Questions/Questions';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import DisplayQuestion from './Pages/Questions/DisplayQuestion';
import Tags from './Pages/Tags/Tags';
import Users from './Pages/Users/Users';
import UserProfile from './Pages/UserProfile/UserProfile';
import UserLocation from './Pages/UserLocation/UserLocation';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Room from './Pages/Room/Room';
import Meeting from './Pages/Meeting/Meeting';
import Subscription from './Pages/Subscription/Subscription';
import Posts from './Pages/Posts/Posts';
import MakePost from './Pages/MakePost/MakePost';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions/>}/>
        <Route path='/AskQuestion' element={<AskQuestion/>}/>
        <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path='/Tags' element={<Tags/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/userLocation' element={<UserLocation/>}/>
        <Route path='/User/:id' element={<UserProfile/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/ResetPassword/:id/:token' element={<ResetPassword/>}/>
        <Route path='/Room' element={<Room/>}/>
        <Route path='/Meeting/:roomID' element={<Meeting/>}/>
        <Route path='/Subscription' element={<Subscription/>}/>
        <Route path='/Posts' element={<Posts/>}/>
        <Route path='/MakePost' element={<MakePost/>}/>
    </Routes>
  )
}

export default AllRoutes