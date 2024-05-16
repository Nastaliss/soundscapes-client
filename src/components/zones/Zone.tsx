import React from 'react'

const Zone = ({zone}: {zone: string}) => {
  return (
    <li>{zone}
        <button>Set zone</button>
    </li>
  )
}

export default Zone
