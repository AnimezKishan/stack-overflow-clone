import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Video.css'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const Video = ({videoSrc}) => {
  const videoRef  = useRef(null);
  
  useEffect(() => {
    const video = videoRef.current;

    const togglePlay = () => {
      video.paused ? video.play() : video.pause();
    };

    const handleDoubleClick = (e) => {
      e.preventDefault();
      const w = video.getBoundingClientRect().width;
      const mouseLocation = e.clientX - video.getBoundingClientRect().left;
      if (mouseLocation < w / 2 - (w/4)) {
        video.currentTime += -5;
      } 
      else if((mouseLocation >= w / 2 - (w/4)) && (mouseLocation < w / 2 + (w/4))){
        togglePlay();
      }
      else if(mouseLocation >=  w / 2 + (w/4)){
        video.currentTime += 10;
      }
    };

    

    const handlePressAndHold = (e) => {
      const mouseLocation = e.clientX - video.getBoundingClientRect().left;
      const holdTime = 500;
      let timeOut;
      let reverse;

      if (mouseLocation < video.getBoundingClientRect().width / 2) {
        timeOut = setTimeout(() => {
          reverse = setInterval(() => {
            video.currentTime = video.currentTime - 0.1;
          }, 10);
        }, holdTime);

        document.addEventListener('mouseup', () => {
          clearInterval(reverse);
          clearTimeout(timeOut);
        });

        document.addEventListener('mouseleave', () => {
          clearInterval(reverse);
          clearTimeout(timeOut);
        });
      } else {
        timeOut = setTimeout(() => {
          video.playbackRate = 2.0;
        }, holdTime);

        document.addEventListener('mouseup', () => {
          video.playbackRate = 1.0;
          clearTimeout(timeOut);
        });

        document.addEventListener('mouseleave', () => {
          clearTimeout(timeOut);
        });
      }
    };

    video.addEventListener('dblclick', handleDoubleClick);
    video.addEventListener('mousedown', handlePressAndHold);

    return () => {
      video.removeEventListener('dblclick', handleDoubleClick);
      video.removeEventListener('mousedown', handlePressAndHold);
    };
  }, []);

  return (
    <div className='video-container'>
      <p><FontAwesomeIcon icon={faQuestion} /></p>
      <div className="instructions">
        <ul>
          <li>Double tap on right to move 10 seconds forward.</li>
          <li>Double tab on left to move 5 seconds backward.</li>
          <li>Double tab in middle to play/pause the video.</li>
          <li>Press and hold on left side to go back at 1x speed.</li>
          <li>Press and hold on right to go forward at 2x speed.</li>
        </ul>
      </div>
      <video ref={videoRef} src={videoSrc} muted controls controlsList='nofullscreen'></video>
    </div>
  )
}

export default Video