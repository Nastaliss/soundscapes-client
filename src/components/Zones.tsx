import React from 'react'
import Zone from './zones/Zone'

const Zones = () => {
  const [zones, setZones] = React.useState<string[]>([])
  const [zoneName, setZoneName] = React.useState<string>('')

  const addZone = () => {
    setZones([...zones, zoneName])
    setZoneName('')
  }
  return (
    <>
      <input value={zoneName} onChange={e => setZoneName(e.target.value)}type="text" placeholder="Zone name"/>
      <button onClick={addZone}>Add a new zone</button>
      <ul>
        {zones.map((zone, index) => <Zone key={index} zone={zone}/>)}
      </ul>
    </>
  )
}

export default Zones
