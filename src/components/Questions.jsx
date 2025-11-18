import { useState, useMemo } from 'react'

export default function Questions(props) {
    const [selectedAnswers, setSelectedAnswers] = useState({})

    function handleAnswerClick(questionIndex, answer) {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }))
    }

    const preparedQuestions = useMemo(() => {
        if (!props.quizData) return []

        const shuffle = answers => {
            const copy = [...answers]
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[copy[i], copy[j]] = [copy[j], copy[i]]
            }
            return copy
        }

        return props.quizData.map(question => ({
            ...question,
            answers: shuffle([
                question.correct_answer,
                ...(question.incorrect_answers || [])
            ])
        }))
    }, [props.quizData])

    return(
        <main>
            <section className="questions-container">
                {preparedQuestions.map((question, index) => (
                    <div key={index} className="question-card">
                        <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
                        <div className="answers-grid">
                            {question.answers.map((answer, answerIndex) => (
                                <button 
                                    key={answerIndex}
                                    className={`answer-button ${selectedAnswers[index] === answer ? 'selected' : ''}`}
                                    onClick={() => handleAnswerClick(index, answer)}
                                    dangerouslySetInnerHTML={{ __html: answer }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <button className="submit-button">Check Answers</button>
            </section>
        </main>
    )
}