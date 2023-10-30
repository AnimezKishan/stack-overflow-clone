import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Questions = ({question}) => {

  const location = useLocation();

  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>votes</p>
        </div>
        <div className='display-votes-ans'>
            <p>{question.noOfAnswers}</p>
            <p>answers</p>
        </div>
        <div className='display-question-details'>
          {
            location.pathname === '/' ? 
            <Link to={`Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
            : <Link to={`${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
          }
          <div className='display-tags-time'>
            <div className='display-tags'>
              {
                question.questionTags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))
              }
            </div>
            <p className='display-time'>
              asked {moment(question.askedOn).fromNow()} by {question.userPosted}
            </p>
          </div>
        </div>
    </div>
  )
}

export default Questions