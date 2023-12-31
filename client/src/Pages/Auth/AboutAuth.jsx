import React from 'react'
import {useTranslation} from 'react-i18next'

const AboutAuth = () => {

  const {t} = useTranslation();

  return (
    <div className='auth-container-1'>
        <h1>{t('aboutD1')}</h1>
        <p>{t('aboutD2')}</p>
        <p>{t('aboutD3')}</p>
        <p>{t('aboutD4')}</p>
        <p>{t('aboutD5')}</p>
        <p style={{color: "#666767", fontSize: "13px"}}>{t('aboutD6')}</p>
        <a href="https://stackoverflow.com/teams?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up" style={{color: "#007ac6", fontSize: "13px", textDecoration:"none"}}>{t('aboutD7')}</a>
    </div>
  )
}

export default AboutAuth