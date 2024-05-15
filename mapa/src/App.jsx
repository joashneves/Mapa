import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Mapa from './router/Mapa'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Mapa/>
    </>
  )
}

export default App
