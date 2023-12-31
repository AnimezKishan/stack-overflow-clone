import React from 'react'
import './languageOption.css'
const LanguageOption = (props) => {
  return (
    <select onChange={props.onChange}>
        <option>Select a Language</option>
        <option value={'en'}>English</option>
        <option value={'hi'}>Hindi 'हिंदी'</option>
        <option value={'ru'}>Russian 'русский'</option>
        <option value={'fr'}>French 'français'</option>
        <option value={'jp'}>Japanese '日本語'</option>
    </select>
  )
}

export default LanguageOption