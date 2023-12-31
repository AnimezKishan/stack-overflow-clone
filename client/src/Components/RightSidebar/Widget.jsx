import React from 'react'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blacklogo from '../../assets/blacklogo.svg'
import {useTranslation} from 'react-i18next'

const Widget = () => {

  const {t} = useTranslation();
  return (
    <div className='widget'>
        <h4>{t('blog')}</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18px'/>
                <p>{t('p1')}</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18px'/>
                <p>{t('p2')}</p>
            </div>
        </div>
        <h4>{t('meta')}</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="comment" width='18px'/>
                <p>{t('p3')}</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="comment" width='18px'/>
                <p>{t('p4')}</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={blacklogo} alt="black_logo" width='18px'/>
                <p>{t('p5')}</p>
            </div>
        </div>
        <h4>{t('mPosts')}</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <p>42</p>
                <p>{t('p6')}</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>25</p>
                <p>{t('p7')}</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>15</p>
                <p>{t('p8')}</p>
            </div>
        </div>
    </div>
  )
}

export default Widget