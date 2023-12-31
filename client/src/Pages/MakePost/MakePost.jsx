import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next'
 
import './MakePost.css'
import Upload from '../../Components/Upload/Upload'
import { makePost } from '../../actions/post';


const MakePost = () => {

  const {t} = useTranslation();
  const [postTitle, setPostTitle] = useState();
  const [postFile, setPostFile] = useState();
  const User = useSelector((state) => (state.currentUserReducer));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postSubmit = (details) => {
    details.preventDefault();
    try {
      dispatch(makePost({ postTitle, postFile, userPosted: User.result.name, userId: User.result._id }, navigate));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>{t('makeaPost')}</h1>
        <form onSubmit={postSubmit}>
          <div className="make-post-container">
            <label htmlFor="post-title">
              <h2>{t('postT')}</h2>
              <p style={{color: "#7e7e7e"}}>{t('postTD')}</p>
              <input className="post-title" type="text" onChange={e => setPostTitle(e.target.value)} placeholder={t('postTP')} id='post-title'/>
            </label> 

            <Upload setPostFile={setPostFile}/>    
            
            <p className='warning'>{t('fileDesc')}</p>
          </div>
          <input type="submit" value={t('makePost')} className='review-btn post-btn'/>
        </form>
      </div>
    </div>
  )
}

export default MakePost