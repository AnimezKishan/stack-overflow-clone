import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users.js'
import { useTranslation } from 'react-i18next'

const EditProfileForm = ({ currentUser, setSwitch }) => {

  const [name, setName] = useState(currentUser?.result?.name)
  const [about, setAbout] = useState(currentUser?.result?.about)
  const [tags, setTags] = useState('')
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const handleSubmit = (detail) => {
    detail.preventDefault()
    if(tags.length === 0)
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags }))
    else
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }))

    setSwitch(false)
  }

  return (
    <div>
      <h1 className='edit-profile-title'>{t('editP')}</h1>
      <h2 className="edit-profile-title-2">{t('publicInfo')}</h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>{t('dName')}</h3>
          <input id='name' type="text" value={name} onChange={(detail) => setName(detail.target.value)}/>
        </label>
        <label htmlFor="about">
          <h3>{t('aboutMe')}</h3>
          <textarea name="" id="about" cols="30" rows="10" value={about} onChange={(detail) => setAbout(detail.target.value)}></textarea>
        </label>
        <label htmlFor='tags'>
          <h3>{t('wTags')}</h3>
          <p>{t('wTagsD')}</p>
          <input type="text" id='tags' onChange={(detail) => setTags(detail.target.value.split(' '))}/>
        </label><br />
        <input type="submit" value={t('saveP')} className='user-submit-btn'/>
        <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>{t('cancel')}</button>
      </form>
    </div>
  )
}

export default EditProfileForm