import React from 'react'

const Button = ({ action, content, className, style }) => {
  return (
    <div className={`btn ${className}`} onClick={action} style={style}>
      {content}
    </div>
  )
}

export default Button
