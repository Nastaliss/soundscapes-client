import './App.css';
import Setup from './pages/Setup'
import React, { useEffect } from 'react'

function App() {
  const connection = React.useRef<WebSocket | null>(null)
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws')
    ws.onopen = (event) => {
      console.log('connected')
      ws.send('hello')
    }
    ws.onmessage = (event) => {
      console.log('message', event.data)
    }
    connection.current = ws
    return () => ws.close()
  })
  return (
    <div>
      <Setup/>
    </div>
  );
}

export default App;
