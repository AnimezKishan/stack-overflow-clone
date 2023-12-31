import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const fetchAllUsers = () => async(dispatch) => {
    try {
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_ALL_USERS', payload: data})
    } 
    catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async(dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updateData);
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
    } 
    catch (error) {
        console.log(error)
    }
}

export const addPro = ({userId}, navigate) => async(dispatch) => {
    try {
        await api.addPro(userId);
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentUser(null))
    } catch (error) {
        console.log(error);
    }
}


export const addAce = ({userId}, navigate) => async(dispatch) => {
    try {
        await api.addAce(userId);
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentUser(null))
    } catch (error) {
        console.log(error);
    }
}