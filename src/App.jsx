import { useEffect, useState } from 'react'
import './App.css'
import { apiData } from './api'
import Start from './components/Start'

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

const quizQuestions = quizData?.map((question, index) => {
  return (<div key={index}>
    <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
    <div>
      <button dangerouslySetInnerHTML={{ __html: question.correct_answer }}></button>
      <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[0] }}></button>
      <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[1] }}></button>
      <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[2] }}></button>
    </div>
  </div>)
})

console.log(quizData)

  return (
    <>

      { !startQuiz &&     <Start handleStartQuiz={handleStartQuiz} /> }
      { startQuiz && quizQuestions }
   
    </>
  )
}

export default App
