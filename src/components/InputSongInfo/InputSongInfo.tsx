import React from 'react'

const InputSongInfo = ({onInputSongConfirm}: {onInputSongConfirm: (bpm: number, timeSignature: number) => any}) => {
  const [bpm, setBpm] = React.useState<number>(80)
  const [timeSignature, setTimeSignature] = React.useState<number|undefined>(4)

  const isValid = () =>  bpm !== undefined && timeSignature !== undefined

  const onConfirm = () => {
    if (isValid()) {
      onInputSongConfirm(bpm!, timeSignature!)
    }
  }

  return (
    <div>
      <label htmlFor="songBpm">Song bpm</label>
      <input id="songBpm" type="number" min={0} placeholder="Song bpm" value={bpm} onChange={e => setBpm(Number(e.target.value))}/>
      <label htmlFor="songTimeSignature">Song time signature</label>
      <input id="songTimeSignature" type="number" min={0} placeholder="Song time signature" value={timeSignature} onChange={(e) => setTimeSignature(Number(e.target.value))}/>
      <button onClick={() => onConfirm} disabled={!isValid()}>Confirm</button>
    </div>
  )
}

export default InputSongInfo
