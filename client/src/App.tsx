import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [poll, setPoll] = useState<string>("")

  useEffect(() => {
    try {
      
    } catch (err) {
      setPoll(err)
    }
  })

  const poll = useRef<string>("")
  
  return (
    <>
  <h2 className='bg-blue-500 justify-center'>This is the list of p</h2>

  <div className=''>
    {poll}
  </div>
    </>
  )
}

export default App
