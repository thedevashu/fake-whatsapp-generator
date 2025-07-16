import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FakeWhatsAppChat from './components/FakeWhatsAppChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FakeWhatsAppChat />
    </>
  )
}

export default App
