import React from 'react'
import './TimelineBar.css'

const TimelineBar = ({text, onClick, isCurrent, subbarCount, currentSubbar}: {text: string, onClick: () => void, isCurrent: boolean, subbarCount: number, currentSubbar: number|null}) => {

  const subbars = Array.from(Array(subbarCount).keys())
  return (
    <div className={`timeline-bar${isCurrent ? " current" : ""}`} onClick={onClick}>
      <p>{text}</p>
      {isCurrent && currentSubbar !== null && <div className="timeline-subbar">
        {subbars.map((i) => <div key={i} className={`timeline-subbar-item${currentSubbar === i ? " current": ""}`}>.</div>)}
        </div>}
    </div>
  )
}

export default TimelineBar