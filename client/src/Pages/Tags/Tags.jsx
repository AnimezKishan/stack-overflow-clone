import React from 'react'
import {useTranslation} from "react-i18next"

import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {

  const {t} = useTranslation();

  const tagsList = [{
      id: 1,
      tagName: `${t('javascript')}`,
      tagDesc: `${t('javascriptD')}`
  },{
      id: 2,
      tagName: `${t('python')}`,
      tagDesc: `${t('pythonD')}`
  },{
      id: 3,
      tagName: `${t('c#')}`,
      tagDesc: `${t('c#D')}`,
  },{
      id: 4,
      tagName: `${t('java')}`,
      tagDesc: `${t('javaD')}`
  },{
      id: 5,
      tagName: `${t('php')}`,
      tagDesc: `${t('phpD')}`
  },{
      id: 6,
      tagName: `${t('html')}`,
      tagDesc: `${t('htmlD')}`
  },{
      id: 7,
      tagName: `${t('android')}`,
      tagDesc: `${t('androidD')}`
  },{
      id: 8,
      tagName: `${t('css')}`,
      tagDesc: `${t('cssD')}`,
  },{
      id: 9,
      tagName: `${t('reactjs')}`,
      tagDesc: `${t('reactjsD')}`
  },{
      id: 10,
      tagName: `${t('nodejs')}`,
      tagDesc: `${t('nodejsD')}`
  }]

  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className="home-container-2">
        <h1 className='tags-h1'>{t('tags')}</h1>
        <p className='tags-p'>{t('tagsD1')}</p>
        <p className='tags-p'>{t('tagsD2')}</p>
        <div className="tags-list-container">
          {
            tagsList.map((tag) => (
              <TagsList tag={tag} key={tagsList.id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Tags