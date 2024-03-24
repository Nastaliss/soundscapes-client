import './App.css';
import Setup from './pages/Setup'
import React, { useEffect, useRef } from 'react'
import { ApiService } from './services/api.service';

function App() {
  const apiService = useRef<ApiService | null>(null)
  const [currentBar, setCurrentBar] = React.useState<number | null>(null)
  const [isReady, setIsReady] = React.useState<boolean>(false)
  useEffect(() => {
    const _apiService = new ApiService()
    const websocket = _apiService.connectToWS(setCurrentBar)
    apiService.current = _apiService
    setIsReady(true)
   return () => websocket.close()
  }, [apiService])
  return (
    <div>
      {isReady ? <Setup currentBar={currentBar}  apiService={apiService.current as unknown as ApiService}/> : "test"}
    </div>
  );
}

export default App;
