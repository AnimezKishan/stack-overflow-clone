import * as api from '../api'

export const makePost = (postData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.makePost(postData);
        dispatch({ type: 'MAKE_POST', payload: data });
        dispatch(fetchAllPosts());
        navigate('/Posts');
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllPosts = () => async(dispatch) => {
    try {
        const { data } = await api.getAllPosts();
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data });
    } 
    catch (error) {
        console.log(error);
    }
}