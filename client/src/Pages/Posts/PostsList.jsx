import React from 'react'
import Post from './Post';

const PostsList = ({postsList}) => {

  return (
    <>
    {
        postsList.map(post => (
            <Post post={post} key={post._id}/>
        ))
    }
    </>
  )
}

export default PostsList