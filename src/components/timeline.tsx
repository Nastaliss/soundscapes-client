import React from 'react'
import './timeline.css'
import { Song } from '../types'
import TimelineBar from './TimelineBar/TimelineBar'

const timeline = ({song, onBarClick}: {song: Song, onBarClick: (barCount: number) => void}) => {
  const barCount = Math.floor(song.barCount)
  return (
    <div id="timeline">
      {[...Array(barCount).keys()].map((bar, index) =>
        <TimelineBar key={index} className='timeline-bar' text={bar.toString()} onClick={() => onBarClick(bar)}/>
      )}
      <div className='timeline-bar'></div>
    </div>

  )
}

export default timeline