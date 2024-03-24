import React from 'react'
import Timeline from '../components/timeline'
import { ApiService } from '../services/api.service'
import { Song } from '../types'
import { NoSongLoadedError } from '../services/api.service.errors'


const Setup = ({currentBar, apiService}: { currentBar: number | null, apiService: ApiService}) => {
  const [songName, setSongName] = React.useState<string| undefined>(undefined)
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [availableSongs, setAvailableSongs] = React.useState<string[]>([])
  const [songInfo, setSongInfo] = React.useState<Song|null>(null)

  React.useEffect(() => {
    (async () => {
      const songs = await apiService.getAvailableSongs()
      setAvailableSongs(songs)
      const currentSong = await apiService.getSongInfo()
      if (currentSong !== null) {
        setPlaying(currentSong.playing)
        setSongInfo(currentSong)
        setSongName(currentSong.name)
      }
      console.log(currentSong)
    })()
  }, [apiService])

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

  const onStart = () => {
    apiService.play()
    setPlaying(true)
  }

  const onStop = () => {
    apiService.stop()
    setPlaying(false)
  }

  const onBarClick = (bar: number) => {
    try {
      apiService.transitionTo(bar)
    }  catch (err) {
      if (err instanceof NoSongLoadedError) {
        console.error(err.message)
      }
      console.log("aqaa")
      console.error(err)
    }
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
        {songInfo && <Timeline song={songInfo} onBarClick={onBarClick} currentBar={currentBar}/>}

        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
    </div>
  )
}

export default Setup