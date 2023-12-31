import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './HomeMainBar.css'
import QuestionsList from './QuestionsList'


const HomeMainBar = () => {

  const questionsList = useSelector(state => state.questionReducer)
  const {t} = useTranslation();
  
  /*
  var questionsList = [{ 
        _id: 1,
        upVotes: 3,
        downVotes: 2,
        noOfAnswers: 2,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags: ["java", "node js", "react js", "mongo db", "express js"],
        userPosted: "mano",
        userId: 1,
        askedOn: "jan 1",
        answer: [{
            answerBody: "Answer",
            userAnswered: 'kumar',
            answeredOn: "jan 2",
            userId: 2,
        }]
    },{ 
        _id: 2,
        upVotes: 3,
        downVotes: 2,
        noOfAnswers: 0,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags: ["javascript", "R", "python"],
        userPosted: "mano",
        askedOn: "jan 1",
        userId: 1,
        answer: [{
            answerBody: "Answer",
            userAnswered: 'kumar',
            answeredOn: "jan 2",
            userId: 2,
        }]
    },{ 
        _id: 3,
        upVotes: 3,
        downVotes: 2,
        noOfAnswers: 0,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags: ["javascript", "R", "python"],
        userPosted: "mano",
        askedOn: "jan 1",
        userId: 1,
        answer: [{
            answerBody: "Answer",
            userAnswered: 'kumar',
            answeredOn: "jan 2",
            userId: 2,
        }]
  }]
  */

  const location = useLocation();
  const user = 1;
  const navigate = useNavigate()

  const checkAuth = () => {
    if(user === null)
    {
      alert("Login or Signup to ask a Question")
      navigate('/Auth')
    }
    else{
      navigate('/AskQuestion')
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>{t('topQ')}</h1> : <h1>{t('allQ')}</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>{t('askQ')}</button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <h1>{t('loading')}</h1> :
          <>
            <p>{questionsList.data.length} {t('questions')}</p>
            <QuestionsList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainBar