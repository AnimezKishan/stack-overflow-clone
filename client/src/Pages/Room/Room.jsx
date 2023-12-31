import React, { useState } from 'react'
import './Room.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Room = () => {

  const [roomID, setRoomID] = useState();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const User = useSelector((state) => (state.currentUserReducer));

  const handleJoin = () => {
    if(!User){
      alert("Login First!!");
      navigate('/Auth');
    }
    else{
      navigate(`/Meeting/${roomID}`);
    }
  }

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2 room-container">
            <div className='main'>
                <div className="container-2">
                    <form onSubmit={handleJoin}>
                        <label htmlFor="room">
                            <h4>{t('room')}</h4>
                        </label>
                        <input type="text" placeholder={t('enterRoom')} id='room' className='email-input' autoComplete='off' onChange={(e) => setRoomID(e.target.value)}/>
                        <p className='desc'>{t('roomDesc')}</p>
                        <button type='submit' className='submit-btn'>{t('join')}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Room