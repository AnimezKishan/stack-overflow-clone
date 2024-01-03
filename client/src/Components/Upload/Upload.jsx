import React, { useState,useEffect } from 'react'
import './Upload.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './firebase';

const Upload = ({setPostFile}) => {

  const [file, setFile] = useState();
  const [input, setInput] = useState()
  const [Perc, setPerc] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    if(file){
      file.type.substr(0, 5) === 'video' ? handleUpload(file, "videoUrl") : handleUpload(file, "imgUrl")
    }
  }, [file])

  const handleUpload = (file, fileType) => {
    
    const storage = getStorage(app);
    const folder = fileType === "imgUrl" ? "images/" : "videos/";
    const fileName = Date.now() + file.name;

    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case 'storage/unauthorized':
            console.log(error);
            break;
          case 'storage/canceled':
            break;

          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setPostFile(downloadURL);
          alert("File Uploaded Successfully");
        });
      }
    );
  }

  return (
    <div className='upload-container'>
        <div className="upload-title">
            <h2 style={{margin: "0"}}>{t('uploadF')}</h2>
            <p>{t('uploadDesc')}</p>
        </div>
        <div className="upload-main">
            
            <label htmlFor="file">
                { Perc > 0 && "Uploading: " + Perc + "%" }
                <h2>{t('dropFile')}</h2>
                <h4>{t('or')}</h4>
                <input onChange={(e) => setFile(e.target.files[0])} style={{resize: "none", border:"none", paddingTop: "150px"}} type="file" id='file'/>
            </label> 
        </div>
        
    </div>
  )
}

export default Upload