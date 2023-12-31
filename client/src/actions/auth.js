import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
    try{
        const { data } = await api.signUp(authData)
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try{
        const { data } = await api.logIn(authData)
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
}

export const loginInfo = (info) => async(dispatch) => {
    try{
        const { email, browser, os, device, ip } = info;
        const { data } = await api.loginInfo(email, browser, os, device, ip);
    }
    catch(error){
        console.log(error)
    }
}

export const forgotPassword = (email, navigate) => async(dispatch) => {
    try{
        const { data } = await api.forgotPassword(email)
        if(data.Status === 'Success'){
            alert('Email Sent. Check your Inbox/Spam.')
            navigate('/');
        }

    }
    catch(error){
        console.log(error)
    }
}

export const resetPassword = (resetData, navigate) => async(dispatch) => {
    try{
        const { password, id, token } = resetData;
        const { data } = await api.resetPassword(password, id, token);
        if(data.Status === 'Success'){
            alert('Password Reset Successfully.')
            navigate('/Auth')
        }
    }
    catch(error){
        console.log(error);
    }
}