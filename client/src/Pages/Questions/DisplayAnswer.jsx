import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Avatar from '../../Components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question.js'

const DisplayAnswer = ({question, handleShare}) => {

  const dispatch = useDispatch();
  const User = useSelector((state) => (state.currentUserReducer))
  const { id } = useParams();
  const {t} = useTranslation();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers -1));
  }

  return (
    <div>
        {
            question.answer.map((ans) => (
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type='button' onClick={handleShare}>{t('share')}</button>
                            {
                                User?.result?._id === ans?.userId && (
                                    <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>{t('delete')}</button>
                                )
                            }
                        </div>
                        <div>
                            <p>{t('answered')} {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/User/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                <Avatar backgroundColor='lightgreen' px='8px' py='5px' borderRadius="10px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                    {ans.userAnswered}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer