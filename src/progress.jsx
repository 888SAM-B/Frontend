import React from 'react'

const progress = ({pro}) => {
  return (
    <div className="progress-container">
    <div className="progress-bar-background">
      <div
        className="progress-bar-filled"
        style={{
          width: `${pro}%`,
        }}
      ></div>
    </div>
    <p className="progress-text">{(pro)}% completed</p>
  </div>  
  )
}

export default progress