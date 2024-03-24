import axios, { AxiosError }  from "axios"
import { Song } from "../types"
import { NoSongLoadedError } from "./api.service.errors"

type GetSongsResponseObject = {
  songs: string[]
}

type SetCurrentSongResponseObject = {
  name: string
  duration: number
  timeSignature: number
  barCount: number
  bpm: number
  playing: boolean
  currentBar: number | null
}


export class ApiService {

  url: string = 'http://localhost:8000'
  websocket: WebSocket | null = null

  public async getTimeline(): Promise<string> {
    return 'timeline'
  }

  public connectToWS(onBarChange: (bar: number | null) => void): WebSocket {
    this.websocket = new WebSocket('ws://localhost:8000/ws')
    this.websocket.onopen = (event) => {
      console.log('connected')
      this.websocket?.send('client connected')
    }
    this.websocket.onmessage = (event) => {
      console.log('message', event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'bar') {
          console.log('bar', data)
          onBarChange(data.bar)
        }
      } catch (error) {
        console.error('error parsing', event.data)
      }
    }
    return this.websocket
  }

  public async setCurrentSong(songName: string): Promise<void> {
    try {
      const setCurrentSongResponse = await axios.post<Song>(`${this.url}/song`, {name: songName})
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        console.error(err.response?.data)
      }
      throw new Error('Failed to set current song')
    }
  }

  public async play(): Promise<void> {
    try {
      await axios.post(`${this.url}/play`, {startBar: 0})
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        console.error(err.response?.data)
      }
    }
  }
  public async stop(): Promise<void> {
    try {
      await axios.post(`${this.url}/stop`)
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        console.error(err.response?.data)
      }
    }
  }

  public async transitionTo(bar: number): Promise<void> {
    try {
      await axios.post(`${this.url}/transition`, {bar})
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        throw new NoSongLoadedError()
      }
    }
  }


  public async getAvailableSongs(): Promise<string[]> {
    try {
      const songs =  await axios.get<GetSongsResponseObject>(`${this.url}/songs`)
      return songs.data.songs
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        console.error(err.response?.data)
      }
      throw new Error('Failed to get available songs')
    }
  }
  
  public async getSongInfo(): Promise<Song | null> {
    try {
      const songInfo = await axios.get<SetCurrentSongResponseObject>(`${this.url}/song`)
      return new Song(songInfo.data)
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          return null
        }
        console.error(err.response?.data)
      }
      throw new Error('Failed to get song info')
    }
  }
}
