import { useEffect, useState } from 'react'
import './App.css'
import { apiData } from './api'
import Start from './components/Start'
import Questions from './components/Questions'

function App() {
  
const [quizData, setQuizData] = useState(null)
const [startQuiz, setStartQuiz] = useState(false)

useEffect(()=>{
  const fetchData = async() => {
    const data = await apiData()
    setQuizData(data.results)
  }
  fetchData()
}, [])

function handleStartQuiz(){
  setStartQuiz(true)
}

console.log(quizData)

  return (
    <>

      { !startQuiz &&  <Start handleStartQuiz={handleStartQuiz} /> }
      { startQuiz && <Questions quizData={quizData}/> }
   
    </>
  )
}

export default App
