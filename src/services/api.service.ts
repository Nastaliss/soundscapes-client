import axios, { AxiosError }  from "axios"
import { Song } from "../types"
import { NoSongLoadedError, getApiErrors } from "./api.service.errors"

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
  websocketFirstSetup: boolean = false

  wsCallbacks : ({
    onBarChange: (bar: number | null) => void,
    onSubBarChange: (subBar: number) => void,
    onSongEnd: () => void
  } | undefined)

  private async reconnectToWsIfNecessary(): Promise<void> {
    console.log("reconnect")

    if (this.websocket?.readyState !== this.websocket?.OPEN && this.websocketFirstSetup) {

      this.connectToWS()
      this.registerWsHandlers()
    }
  }

  public async getTimeline(): Promise<string> {
    return 'timeline'
  }

  public connectToWS(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
        this.websocket = new WebSocket('ws://localhost:8000/ws')
        console.log("here")
        this.websocket.onopen = (event) => {
          console.log('connected')
          this.websocket?.send('client connected')
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  public closeWebsocket(): void {
    this.websocket?.close()
  }

  public subscribeToWS(onBarChange: (bar: number | null) => void, onSubBarChange : (subBar: number) => void, onSongEnd: () => void): void {
    console.log("firstsetup")

    this.wsCallbacks = {
      onBarChange,
      onSubBarChange,
      onSongEnd,
    }
    this.registerWsHandlers()
    this.websocketFirstSetup = true
  }

  private registerWsHandlers(): void {
    if (!this.websocket) {
      throw new Error('No websocket connection')
    }
    this.websocket.onmessage = (event) => {
      console.log('message', event.data)
      try {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case 'end':
            this.wsCallbacks?.onSongEnd()
            break
          case 'bar':
            this.wsCallbacks?.onBarChange(data.bar)
            break
          case 'subBar':
            this.wsCallbacks?.onSubBarChange(data.subBar)
            break
          default:
            console.error('unknown ws message type', data)
        }
      } catch (error) {
        console.error('error parsing', event.data)
      }
    }
  }

  public async setCurrentSong(songName: string): Promise<void> {
    this.reconnectToWsIfNecessary()
    try {
      const setCurrentSongResponse = await axios.post<Song>(`${this.url}/song`, {name: songName})
    } catch (err: AxiosError | unknown) {
      getApiErrors(err)
    }
  }

  public async play(): Promise<void> {

    this.reconnectToWsIfNecessary()
    try {
      await axios.post(`${this.url}/play`, {startBar: 0})
    } catch (err: AxiosError | unknown) {
        throw getApiErrors(err)
    }
  }
  public async stop(): Promise<void> {
    this.reconnectToWsIfNecessary()
    try {
      await axios.post(`${this.url}/stop`)
    } catch (err: AxiosError | unknown) {
        throw getApiErrors(err)
    }
  }

  public async transitionTo(bar: number): Promise<void> {
    this.reconnectToWsIfNecessary()
    try {
      await axios.post(`${this.url}/transition`, {bar})
    } catch (err: AxiosError | unknown) {
        throw getApiErrors(err)
    }
  }


  public async getAvailableSongs(): Promise<string[]> {
    this.reconnectToWsIfNecessary()
    try {
      const songs =  await axios.get<GetSongsResponseObject>(`${this.url}/songs`)
      return songs.data.songs
    } catch (err: AxiosError | unknown) {
        throw getApiErrors(err)
    }
  }
  
  public async getSongInfo(): Promise<Song | null> {
    this.reconnectToWsIfNecessary()
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
