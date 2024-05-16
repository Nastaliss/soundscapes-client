export class SongBase {
  name: string
  id: number

  constructor({name, id}: {name: string, id: number}) {
    this.name = name
    this.id = id
  }
}

export class Song extends SongBase {
  duration: number
  timeSignature: number
  barCount: number
  bpm: number
  playing: boolean
  currentBar: number|null

  constructor({id, name, duration, timeSignature, barCount, bpm, playing, currentBar}: {id: number, name: string, duration: number, timeSignature: number, barCount: number, bpm: number, playing: boolean, currentBar: number|null}) {
    super({name, id})
    this.duration = duration
    this.timeSignature = timeSignature
    this.barCount = barCount
    this.bpm = bpm
    this.playing = playing
    this.currentBar = currentBar
  }
}