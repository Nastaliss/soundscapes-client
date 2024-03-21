import React from 'react'
import Timeline from '../components/timeline'
import { ApiService } from '../services/api.service'
import { Song } from '../types'


const Setup = () => {
  const [songName, setSongName] = React.useState<string| undefined>(undefined)
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [transitionBar, setTransitionBar] = React.useState<number>(0)
  const [availableSongs, setAvailableSongs] = React.useState<string[]>([])
  const [songInfo, setSongInfo] = React.useState<Song|null>(null)
  const apiService = new ApiService()

  React.useEffect(() => {
    (async () => {
      const songs = await apiService.getAvailableSongs()
      setAvailableSongs(songs)
    })()
  }, [])

  const onConfirm = async () => {
    console.log('here', songName)
    if (!songName) {
      return
    }
    console.log(`confirmed ${songName}`)
    await apiService.setCurrentSong(songName)
    const songInfo = await apiService.getSongInfo()
    console.log(songInfo)
    setSongInfo(songInfo)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSongName(e.target.value)
  }

  const onTransitionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let bar = parseInt(e.target.value)
    if (isNaN(bar) || bar < 0) {
      bar = 0
    } else if (bar > 100) {
    }
    console.log(bar)
    setTransitionBar(bar)
  }

  const onTransitionButtonPress = () => {
    apiService.transitionTo(transitionBar)
  }

  const onStart = () => {
    apiService.play()
    setPlaying(true)
  }

  const onStop = () => {
    apiService.stop()
    setPlaying(false)
  }

  const onBarClick = (bar: number) => {
    apiService.transitionTo(bar)
  }

  return (
    <div>
        <h1>Setup</h1>
        <label htmlFor="songs">Choose a song:</label>
        <select name="songs" id="songs" value={songName} onChange={onInputChange}>
          <option value="default">Select a song</option>
          {availableSongs.map((song, index) => <option key={index} value={song}>{song}</option>
          )}
        </select>
        {songInfo && <Timeline song={songInfo} onBarClick={onBarClick}/>}

        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        {playing ? <div>
          <input onChange={onTransitionInputChange} value={transitionBar}/>
          <button onClick={onTransitionButtonPress}>Transition</button>
        </div> : <div>
          
        </div>}
    </div>
  )
}

export default Setup