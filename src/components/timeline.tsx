import React from 'react'
import './timeline.css'
import { Song } from '../types'
import TimelineBar from './TimelineBar/TimelineBar'

const timeline = ({song}: {song: Song}) => {
  const barCount = Math.floor(song.barCount)
  return (
    <div id="timeline">
      {[...Array(4).keys()].map((bar, index) =>
        <TimelineBar key={index} className='timeline-bar'/>
      )}
      <div className='timeline-bar'></div>
    </div>

  )
}

export default timeline