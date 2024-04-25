import React from 'react'
import './timeline.css'
import { Song } from '../types'
import TimelineBar from './TimelineBar/TimelineBar'

const timeline = ({song, onBarClick, currentBar, currentSubbar}: {song: Song, onBarClick: (barCount: number) => void, currentBar: number|null, currentSubbar: number|null}) => {
  const barCount = Math.floor(song.barCount)
  return (
    <div id="timeline">
      {[...Array(barCount).keys()].map((bar, index) =>
        <TimelineBar key={index} text={bar.toString()} onClick={() => onBarClick(bar)} isCurrent={index === currentBar} subbarCount={song.timeSignature} currentSubbar={currentSubbar}/>
      )}
    </div>

  )
}

export default timeline