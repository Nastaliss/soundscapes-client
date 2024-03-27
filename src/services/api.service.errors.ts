import axios, { AxiosError } from "axios"

export class SoundScapeError extends Error {}

export class NoSongLoadedError extends SoundScapeError {
  message: string = "No song loaded"
}
export class BarOutOfBoundsError extends SoundScapeError {
  message: string = "Bar out of bounds"
}
export class NoSongPlayingError extends SoundScapeError {
  message: string = "No song playing"
}
export class AlreadyTransitionningError extends SoundScapeError {
  message: string = "Already transitionning"
}

const errorCodeToError :Record<string, new() => SoundScapeError> = {
  "already_transitionning": AlreadyTransitionningError,
  "bar_out_of_bounds": BarOutOfBoundsError,
  "no_song_loaded": NoSongLoadedError,
  "no_song_playing": NoSongPlayingError,

}

export const getApiErrors = (error: AxiosError | unknown): Error | SoundScapeError =>{
  if(!axios.isAxiosError(error)) {
    return new Error(`Unknown error ${error}`)
  }
  if (!error.response || !error.response.data || !error.response.data.errorCode) {
    return new Error(`Unknown axios error ${error}`)
  }
  const errorCode = error.response.data.errorCode
  const errorClass = errorCodeToError[errorCode]
  if (!errorClass) {
    return new Error(`Unknown error code ${errorCode}`)
  }
  return new errorClass()
}
