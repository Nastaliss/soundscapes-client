import React from 'react'
import './timeline.css'
import { Song } from '../types'
import TimelineBar from './TimelineBar/TimelineBar'

const timeline = ({song, onBarClick, currentBar}: {song: Song, onBarClick: (barCount: number) => void, currentBar: number|null}) => {
  const barCount = Math.floor(song.barCount)
  return (
    <div id="timeline">
      {[...Array(barCount).keys()].map((bar, index) =>
        <TimelineBar key={index} text={bar.toString()} onClick={() => onBarClick(bar)} isCurrent={index === currentBar}/>
      )}
      <div className='timeline-bar'></div>
    </div>

  )
}

export default timeline