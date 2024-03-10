export class Song {
    name: string
    duration: number
    timeSignature: number
    barCount: number
    bpm: number
  
    constructor({name, duration, timeSignature, barCount, bpm}: {name: string, duration: number, timeSignature: number, barCount: number, bpm: number}) {
      this.name = name
      this.duration = duration
      this.timeSignature = timeSignature
      this.barCount = barCount
      this.bpm = bpm
    }
  }