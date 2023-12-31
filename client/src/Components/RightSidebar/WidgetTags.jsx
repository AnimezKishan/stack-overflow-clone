import React from 'react'
import { useTranslation } from 'react-i18next';

const WidgetTags = () => {

    const {t} = useTranslation();
  
    const tags = ['c', 'css',  'express', 'firebase', 'html', 'java', 'javascript','mern','mongodb','mysql','next.js','node.js','php','python','reactjs']

    return (
    <div className='widget-tags'>
        <h3 style={{padding: "0 15px", paddingTop:"10px"}}>{t('wTags')}</h3>
        <div className='widget-tags-div'>
            {
                tags.map((tag, key) => (
                        <p key={key}>{tag}</p>
                    )
                )
            }
        </div>
    </div>
  )
}

export default WidgetTags