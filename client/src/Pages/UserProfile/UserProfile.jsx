import React,{ useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

import './UserProfile.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import Avatar from '../../Components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import LoginInfo from './LoginInfo'

const UserProfile = () => {
  
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const questions = useSelector((state) => state.questionReducer);
  const currentUserQuestions = questions.data.filter((question) => question.userId === id)
  const{t} = useTranslation();

  const currentProfile = users.filter((user) => user._id === id)[0]
  const currentUser = useSelector((state) => state.currentUserReducer)
  const colors = ['purple', 'blue', 'darkred', 'magenta']
  const randomColor = colors[(Math.floor(Math.random() * colors.length))]

  const [Switch, setSwitch] = useState(false)

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
            <section>
                <div className="user-details-container">
                    <div className="user-details">
                        <Avatar backgroundColor={randomColor} color='white' fontSize='50px' px='50px' py='40px' borderRadius='10px'>
                            {currentProfile?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className='user-name'>
                            <h1>{currentProfile?.name}</h1>
                            <p><FontAwesomeIcon icon={faCalendarPlus}/> {t('joined')} {moment(currentProfile?.joinedOn).fromNow()}</p>
                        </div>
                    </div>
                    {
                        currentUser?.result._id === id && (
                            <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                <FontAwesomeIcon icon={faPen} /> {t('editP')}
                            </button>
                        )
                    }
                </div>
                <>
                    {
                        Switch ? (
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                        ) : (
                            <ProfileBio currentProfile={currentProfile} currentUserQuestions={currentUserQuestions}/>
                        )
                    }
                </>
                {
                    currentUser?.result._id === id && !Switch && (
                        <LoginInfo currentUser={currentUser} />
                    )
                }
            </section>
        </div>
    </div>
  )
}

export default UserProfile