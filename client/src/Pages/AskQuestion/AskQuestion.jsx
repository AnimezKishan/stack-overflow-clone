import React from 'react'
import './AskQuestion.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import { askQuestion } from '../../actions/question'
import RichTextEditor from '../../Components/RichTextEditor/RichTextEditor'
import Upload from '../../Components/Upload/Upload'

const AskQuestion = () => {

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  const [videoFile, setVideoFile] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => (state.currentUserReducer));
  const {t} = useTranslation();
  

  const handleSubmit = (detail) => {
    detail.preventDefault();
    if(User?.result?.questionQouta < 1){
      navigate('/Subscription');
      alert('Your Question Qouta Ended!!');
    }
    else{
      try {
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id, videoFile }, navigate))
      } catch (error) {
        console.log(error);
        alert('Login first!');
        navigate('/Auth');
      }
    }
  }

  const handleEnter = (detail) => {
    if(detail.key === 'Enter'){
      setQuestionBody(questionBody + "\n");
    }
  }

  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>{t('askPq')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>{t('title')}</h4>
              <p>{t('titleD')}</p>
              <input type="text" onChange={(detail) => {setQuestionTitle(detail.target.value)}} placeholder={t('titlePh')} id='ask-ques-title'/>
            </label>
            <label htmlFor="ask-ques-body">
              <h4>{t('body')}</h4>
              <p>{t('bodyD')}</p>
              {/* <RichTextEditor setQuestionBody={setQuestionBody}/> */}
              <textarea id="ask-ques-body" onChange={(detail) => {setQuestionBody(detail.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
            </label>

            <Upload setPostFile={setVideoFile}/>
            
            <label htmlFor="ask-ques-tags">
              <h4>{t('tags')}</h4>
              <p>{t('tagsD')}</p>
              <input type="text" onChange={(detail) => {setQuestionTags(detail.target.value.split(" "))}} placeholder={t('tagsPh')} id='ask-ques-tags'/>
            </label>
          </div>
          <input type="submit" value={t('reviewQ')} className='review-btn'/>
        </form>
      </div>
    </div>
  )
}

export default AskQuestion