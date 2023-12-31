import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);
export const loginInfo = (email, browser, os, device, ip) => API.patch('/user/logInfo', {email, browser, os, device, ip});
export const forgotPassword = (email) => API.post('/user/forgotPassword', email);
export const resetPassword = (password, id, token) => API.post(`/user/resetPassword/${id}/${token}`, {password});

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId })
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers })

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);

export const addPro = (userId) => API.patch('/user/addSub/pro', {userId});
export const addAce = (userId) => API.patch('/user/addSub/ace', {userId});

export const makePost = (postData) => API.post('/post/makePost', postData);
export const getAllPosts = () => API.get('/post/get');