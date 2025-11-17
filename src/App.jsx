import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { apiData } from './api'

function App() {
  
const [quizData, setQuizData] = useState(null)

useEffect(()=>{
  const fetchData = async() => {
    const data = await apiData()
    setQuizData(data.results)
  }
  fetchData()
}, [])

console.log(quizData)

  return (
    <>
      <main>
        <h1>Quizzical</h1>
        <p>first solo project</p>
        <button>Start Quiz</button>
      </main>
    </>
  )
}

export default App
