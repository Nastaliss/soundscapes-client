export class Song {
    name: string
    duration: number
    timeSignature: number
    barCount: number
    bpm: number
    playing: boolean
    currentBar: number|null

    constructor({name, duration, timeSignature, barCount, bpm, playing, currentBar}: {name: string, duration: number, timeSignature: number, barCount: number, bpm: number, playing: boolean, currentBar: number|null}) {
      this.name = name
      this.duration = duration
      this.timeSignature = timeSignature
      this.barCount = barCount
      this.bpm = bpm
      this.playing = playing
      this.currentBar = currentBar
    }
  }