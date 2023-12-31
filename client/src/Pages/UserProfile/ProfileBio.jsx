import React from 'react'
import { useTranslation } from 'react-i18next'
import './UserProfile.css'

const ProfileBio = ({currentProfile, currentUserQuestions}) => {

  const {t} = useTranslation();
  var explorerBadgeLevel = 0;
  var expertBadgeLevel = 0;

  currentUserQuestions.map((question) => {
    if(question.upVote.length - question.downVote.length >= 5){
      explorerBadgeLevel = 1;
    }
    else if(question.upVote.length - question.downVote.length >= 20){
      explorerBadgeLevel = 2;
    }
    else if(question.upVote.length - question.downVote.length >= 50){
      explorerBadgeLevel = 3;
    }
  })

  if(currentProfile?.questionAnswered >= 5){
    expertBadgeLevel = 1;
  }
  if(currentProfile?.questionAnswered >= 10){
    expertBadgeLevel = 2;
  }
  if(currentProfile?.questionAnswered >= 20){
    expertBadgeLevel = 3;
  }

  return (
    <div>
      <div className="badge-main">
        {
          explorerBadgeLevel === 1 && (
            <div className='bronze badge'>
              <h2>{t('expoI')}</h2>
              <p>{t('expoIDesc')}</p>
            </div>
          )
        }

        {
          explorerBadgeLevel === 2 && (
            <div className='silver badge'>
              <h2>{t('expoII')}</h2>
              <p>{t('expoIIDesc')}</p>
            </div>
          )
        }

        {
          explorerBadgeLevel === 3 && (
            <div className='gold badge'>
              <h2>{t('expoIII')}</h2>
              <p>{t('expoIIIDesc')}</p>
            </div>
          )
        }

        {
          expertBadgeLevel === 1 && (
            <div className='bronze badge'>
              <h2>{t('expI')}</h2>
              <p>{t('expIDesc')}</p>
            </div>
          )
        }

        {
          expertBadgeLevel === 2 && (
            <div className='silver badge'>
              <h2>{t('expII')}</h2>
              <p>{t('expIIDesc')}</p>
            </div>
          )
        }

        {
          expertBadgeLevel === 3 && (
            <div className='gold badge'>
              <h2>{t('expIII')}</h2>
              <p>{t('expIIIDesc')}</p>
            </div>
          )
        }
        
      </div>
      <div>
        {
          currentProfile?.tags.length !== 0 ? (
            <>
              <h4>{t('tagsW')}</h4>
              {
                currentProfile?.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))
              } 
            </> 
          ) : 
          (
            <p>{t('0tags')}</p>
          )
        }
      </div>
      <div>
        {
          currentProfile?.about ? (
            <>
              <h4>{t('about')}</h4>
              <p>{currentProfile?.about}</p>
            </>
          ) : 
          (
            <p>{t('noBio')}</p>
          )
        }
      </div>
    </div>
  )
}

export default ProfileBio