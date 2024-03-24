
export class NoSongLoadedError extends Error {
  constructor() {
    super('No song loaded')
    this.name = 'NoSongLoadedError'
  }
}
