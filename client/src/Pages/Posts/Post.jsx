import React from 'react'
import './Posts.css'
import moment from 'moment'
import Avatar from '../../Components/Avatar/Avatar'
import { Link } from 'react-router-dom'
import Video from '../../Components/Video/Video'

const Post = ({post}) => {

  return (
    <div className='display-post-container'>
      <div className="post-header">
        <div>
          <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%'><Link to={`/User/${post.userId}`} style={{color:"white", textDecoration:"none"}}>{post.userPosted.charAt(0).toUpperCase()}</Link></Avatar>
          <h3><Link to={`/User/${post.userId}`} style={{color:"black", textDecoration:"none"}}>{post.userPosted}</Link></h3>
        </div>
        <p className='display-time'>post {moment(post.postedOn).fromNow()}</p>
      </div>
      <p><i>{post.postTitle}</i></p>
      
        {
          post.postFile ? (
          <div className="post-file">
            {
            post.postFile.includes('.mp4') === true ? (
              <Video videoSrc={post.postFile}></Video>
            ):
            <img src={post.postFile} alt="" />
            }
          </div>
          ) : <></>
        }
      
    </div>
  )
}

export default Post