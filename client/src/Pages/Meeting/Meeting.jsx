import React from 'react'
import './Meeting.css'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { NavLink, useParams } from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const Meeting = () => {
  
  const {roomID} = useParams();
  const {t} = useTranslation();

  let myMeeting = async(element) => {
    const appID = 1807172554;
    const serverSecret = "53652e90a9570a9e1c9cf62dfa300dc4";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  "User");
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url: `http://localhost:3000/Meeting/${roomID}`
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  }
  return (
    <section className='meeting-container'>
      <div ref={myMeeting}></div>
      <NavLink to='/'><button className='go-home'>{t('goH')}</button></NavLink>
      <p>{t('goHDesc')}</p>
    </section>
    
  )
}

export default Meeting