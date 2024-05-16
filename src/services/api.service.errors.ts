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
export class SongAlreadyPlayingError extends SoundScapeError {
  message: string = "Already playing"
}
export class SongNotFoundError extends SoundScapeError {
  message: string = "Song not found"
}
export class SongInfoNotFoundError extends SoundScapeError {
  message: string = "Song info not found"
}
const errorCodeToError :Record<string, new() => SoundScapeError> = {
  "already_transitionning": AlreadyTransitionningError,
  "bar_out_of_bounds": BarOutOfBoundsError,
  "no_song_loaded": NoSongLoadedError,
  "no_song_playing": NoSongPlayingError,
  "song_already_playing": SongAlreadyPlayingError,
  "song_not_found": SongNotFoundError,
  "song_info_not_found": SongInfoNotFoundError,
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
