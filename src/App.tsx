import './App.css';
import Setup from './pages/Setup'
import React, { useEffect, useRef } from 'react'
import { ApiService } from './services/api.service';

function App() {
  const apiService = useRef<ApiService | null>(null)
  const [isReady, setIsReady] = React.useState<boolean>(false)

  useEffect(() => {
    (async () => {

      const _apiService = new ApiService()
      await _apiService.connectToWS()
      apiService.current = _apiService
      setIsReady(true)
    })()
    return () => apiService.current?.closeWebsocket()

  }, [apiService])
  return (
    <div>
      {isReady ? <Setup apiService={apiService.current as unknown as ApiService}/> : "test"}
    </div>
  );
}

export default App;
