import React from 'react'

const TimelineBar = ({className, text, onClick}: {className: string, text: string, onClick: () => void}) => {
  return (
    <div className={className} onClick={onClick}>{text}</div>
  )
}

export default TimelineBar