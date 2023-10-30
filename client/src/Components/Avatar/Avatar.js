import React from 'react'

const Avatar = ({ children, backgroundColor, color, px, py, borderRadius,  cursor}) => {
  
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || 'black',
    borderRadius,
    textAlign: "center",
    cursor: cursor || null
  }
  
  return (
    <div style={style}>{children}</div>
  )
}

export default Avatar