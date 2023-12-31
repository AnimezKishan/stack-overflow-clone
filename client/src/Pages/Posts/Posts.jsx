import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import PostsList from './PostsList'
import { useTranslation } from 'react-i18next'

const Posts = () => {

  const {t} = useTranslation();
  const user = useSelector((state) => state.currentUserReducer);
  const posts = useSelector((state) => state.postReducer);
  
  const navigate = useNavigate();

  const checkAuth = () => {
    if(user === null)
    {
      alert("Login or Signup to make a Post")
      navigate('/Auth')
    }
    else{
      navigate('/MakePost')
    }
  }

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <div className='main-bar'>
                <div className='main-bar-header'>
                    <h1>{t('allPosts')}</h1>
                    <button onClick={checkAuth} className='ask-btn'>{t('makePost')}</button>
                </div>
                {
                  posts.data === null ?
                  <h1>Loading...</h1> :
                  <>
                    <p>{posts.data.length} {t('posts')}</p>
                    <PostsList postsList={posts.data}/>
                  </>
                }
            </div>
            <RightSidebar/>
        </div>
    </div>
  )
}

export default Posts