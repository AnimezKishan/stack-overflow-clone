import React, { useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './QuestionDetails.css'
import Avatar from '../../Components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import Video from '../../Components/Video/Video'


const QuestionDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    
    const questionsList = useSelector(state => state.questionReducer)

    const [Answer, setAnswer] = useState('')
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = `https://stack-overflow-clone-kishan.netlify.app${location.pathname}`

    const handlePostAnswer = (detail, answerLength) => {
        detail.preventDefault()
        if(User === null){
            alert('Login or Signup to answer')
            navigate('/Auth')
        }
        else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User?.result?._id}))
            }
        }
    }

    const handleShare = () => {
        copy(url)
        alert(`URL copied to clipboard: ${url}`)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        try {
            dispatch(voteQuestion(id, 'upvote', User.result._id))
        } 
        catch (error) {
            alert("Login First!!")
            navigate('/Auth')    
        }
    }

    const handleDownVote = () => {
        try{
            dispatch(voteQuestion(id, 'downvote', User.result._id))
        }
        catch (error) {
            alert("Login First!!")
            navigate('/Auth')    
        }
    }

    /*
    var questionsList = [{ 
        _id: '1',
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
            answerBody: "This is Answer",
            userAnswered: 'kumar',
            answeredOn: "jan 2",
            userId: 2,
        }]
    },{ 
        _id: '2',
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
        _id: '3',
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

    return (
    <div className='question-details-page'>
        {
            questionsList.data === null ?
            <h1>{t('loading')}</h1>:
            <>
                {
                    questionsList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className="question-votes">
                                        <img src={upvote} alt="upvote" width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvote} alt="downvote" width='18' className='votes-icon' on onClick={handleDownVote}/>
                                    </div>
                                    <div style={{width: "100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className='question-details-tags'>
                                            {
                                                question.questionTags.map((tag) => (
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        {
                                            question.videoFile ? (
                                                <div className="question-file" style={{}}>
                                                    {
                                                        question.videoFile.slice(-4) === '.mp4' ? (
                                                            <Video videoSrc={question.videoFile}></Video>
                                                          ):
                                                          <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={question.videoFile} alt="" />
                                                    }
                                                </div>
                                            ) : <></>
                                        }
                                        <div className='question-actions-user'>
                                            <div>
                                                <button type='button' onClick={handleShare}>{t('share')}</button>
                                                {
                                                    User?.result?._id === question?.userId && (
                                                        <button type='button' onClick={handleDelete}>{t('delete')}</button>
                                                    )
                                                }
                                                
                                            </div>
                                            <div>
                                                <p>{t('asked')} {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor='orange' px='8px' py='5px' borderRadius="10px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers !== 0 && (
                                    <section>
                                        {
                                            (question.noOfAnswers > 1) ? 
                                            <h3>{question.noOfAnswers} {t('answers')}</h3> : 
                                            <h3>{question.noOfAnswers} {t('answer')}</h3>
                                        }
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>{t('yourA')}</h3>
                                <form onSubmit={(detail) => {handlePostAnswer(detail, question.answer.length)}}>
                                    <textarea name="" id="" cols="30" rows="10" onChange={detail => setAnswer(detail.target.value)}></textarea><br />
                                    <input type="submit" className='post-ans-btn' value={t('postA')}/>
                                </form>
                                <p>
                                    {t('browseTag')}
                                    {
                                        question.questionTags.map((tag) => (
                                            <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                                        ))
                                    }
                                    {t('or')}
                                    <Link to='/AskQuestion' style={{textDecoration: "none", color: "#009dff"}}> {t('askOwn')}</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionDetails