import axios, { AxiosError }  from "axios"
import { Song } from "../types"

type GetSongsResponseObject = {
  songs: string[]
}

type SetCurrentSongResponseObject = {
  name: string
  duration: number
  timeSignature: number
  barCount: number
  bpm: number
}

export class ApiService {

  url: string = 'http://localhost:8000'

  public async getTimeline(): Promise<string> {
    return 'timeline'
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
        console.error(err.response?.data)
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
  
  public async getSongInfo(): Promise<Song> {
    try {
      const songInfo = await axios.get<SetCurrentSongResponseObject>(`${this.url}/song`)
      return new Song(songInfo.data)
    } catch (err: AxiosError | unknown) {
      if(axios.isAxiosError(err)) {
        console.error(err.response?.data)
      }
      throw new Error('Failed to get song info')
    }
  }
}
