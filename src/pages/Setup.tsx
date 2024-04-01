import React from 'react'
import Timeline from '../components/timeline'
import { ApiService } from '../services/api.service'
import { Song } from '../types'
import { NoSongLoadedError } from '../services/api.service.errors'


const Setup = ({apiService}: {apiService: ApiService}) => {
  const [songName, setSongName] = React.useState<string| undefined>(undefined)
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [availableSongs, setAvailableSongs] = React.useState<string[]>([])
  const [songInfo, setSongInfo] = React.useState<Song|null>(null)
  const [currentBar, setCurrentBar] = React.useState<number | null>(null)

  React.useEffect(() => {
    (async () => {
      apiService.subscribeToWS(
        setCurrentBar,
        onSongEnd
      )
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

  const onSongEnd = () => {
    setPlaying(false)
    setCurrentBar(null)
  }

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

  const onStart = async () => {
    try {
      await apiService.play()
      setPlaying(true)
    } catch (err) {
      if (err instanceof NoSongLoadedError) {
        setSongInfo(null)
      }
    }
  }

  const onStop = () => {
    apiService.stop()
    setPlaying(false)
  }

  const onBarClick = async (bar: number) => {
    try {
      await apiService.transitionTo(bar)
    }  catch (err) {
      if (err instanceof NoSongLoadedError) {
        setSongInfo(null)
      }
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
      <p>Song selected ? {songInfo ===null ? "no" : "yes"}</p>
      <p>Playing ? {playing ? "yes" :"no"}</p>
    </div>
  )
}

export default Setup