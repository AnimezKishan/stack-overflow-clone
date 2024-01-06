import React from 'react'
import './Meeting.css'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { NavLink, useParams } from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const Meeting = () => {
  
  const {roomID} = useParams();
  const {t} = useTranslation();

  let myMeeting = async(element) => {
    const appID = 15561491;
    const serverSecret = "1d86454fff14c5fcba5af84a9868eb1c";
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