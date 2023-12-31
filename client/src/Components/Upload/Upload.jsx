import React, { useState } from 'react'
import './Upload.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Upload = ({setPostFile}) => {

  const [file, setFile] = useState();
  const {t} = useTranslation();

  const handleUpload = (detail) => {
    
    detail.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/user/upload', formData)
    .then(res => {
      alert(t('FUS'));
      const imgSrc = `http://localhost:5000${res?.data.substr(6)}`;
      setPostFile(imgSrc);
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='upload-container'>
        <div className="upload-title">
            <h2 style={{margin: "0"}}>{t('uploadF')}</h2>
            <p>{t('uploadDesc')}</p>
        </div>
        <div className="upload-main">
            
            <label htmlFor="file">
                <h2>{t('dropFile')}</h2>
                <h4>{t('or')}</h4>
                <input onChange={(e) => setFile(e.target.files[0])} style={{resize: "none", border:"none", paddingTop: "150px"}} type="file" id='file'/>
            </label> 
        </div>
        <button onClick={handleUpload} className='upload-button'>{t('upload')}</button>
    </div>
  )
}

export default Upload