import { useState } from 'react'

export default function Questions(props) {
    const [selectedAnswers, setSelectedAnswers] = useState({})

    function handleAnswerClick(questionIndex, answer) {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }))
    }

    const quizQuestions = props.quizData?.map((question, index) => {
        let answers = []

        if(question.type === 'multiple') {
            answers = [
                question.correct_answer,
                ...question.incorrect_answers
            ].sort(() => Math.random() - 0.5) // Shuffle answers
        }

        if(question.type === 'boolean'){
            answers = [
                question.correct_answer,
                ...question.incorrect_answers
            ].sort(() => Math.random() - 0.5) // Shuffle answers
        }

        return (
            <div key={index} className="question-card">
                <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
                <div className="answers-grid">
                    {answers.map((answer, answerIndex) => (
                        <button 
                            key={answerIndex}
                            className={`answer-button ${selectedAnswers[index] === answer ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick(index, answer)}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    ))}
                </div>
            </div>
        )
    })

    return(
        <main>
            <section className="questions-container">
                {quizQuestions}
                <button className="submit-button">Check Answers</button>
            </section>
        </main>
    )
}