import React from 'react'
import './TimelineBar.css'

const TimelineBar = ({text, onClick, isCurrent}: {text: string, onClick: () => void, isCurrent: boolean}) => {
  return (
    <div className={`timeline-bar${isCurrent ? " current" : ""}`} onClick={onClick}><p>{text}</p></div>
  )
}

export default TimelineBar