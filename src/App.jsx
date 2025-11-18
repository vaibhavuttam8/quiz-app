import { useEffect, useState } from 'react'
import './App.css'
import { apiData } from './api'
import Start from './components/Start'
import Questions from './components/Questions'

function App() {
  
const [quizData, setQuizData] = useState(null)
const [startQuiz, setStartQuiz] = useState(false)
const [loading, setLoading] = useState(true)


const fetchData = async() => {
  setLoading(true)
  const data = await apiData()
  if (data) {  // Add check to prevent error if data is undefined
    setQuizData(data.results)
  }
  setLoading(false)
}


  useEffect(()=>{
    const loadData = async() => {
      setLoading(true)
      const data = await apiData()
      if (data) {
        setQuizData(data.results)
      }
      setLoading(false)
    }
    loadData()
  }, [])

function handleStartQuiz(){
  setStartQuiz(true)
}

console.log(quizData)

  return (
    <>
      { !startQuiz &&  <Start handleStartQuiz={handleStartQuiz} /> }
      { startQuiz && !loading && <Questions quizData={quizData} onPlayAgain={fetchData}/> }
      { startQuiz && loading && <div>Loading new questions...</div> }   
    </>
  )
}

export default App
