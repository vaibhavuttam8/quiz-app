import { useState, useMemo } from 'react'

// Seeded random number generator for deterministic shuffling
function createSeededRandom(seed) {
    let currentSeed = seed
    return function() {
        currentSeed = (currentSeed * 9301 + 49297) % 233280
        return currentSeed / 233280
    }
}

function shuffleArray(array, seed) {
    const copy = [...array]
    const random = createSeededRandom(seed)
    
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export default function Questions(props) {
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [submit, setSubmit] = useState(false)
    const [score, setScore] = useState(0)


    function checkAnswers() {
        setSubmit(true)
        setScore(calculateScore())
    }



    function handleAnswerClick(questionIndex, answer) {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }))
    }

    const preparedQuestions = useMemo(() => {
        if (!props.quizData) return []

        // Create a deterministic seed from question text
        const createSeed = (text, index) => {
            let hash = index
            for (let i = 0; i < text.length; i++) {
                hash = ((hash << 5) - hash) + text.charCodeAt(i)
                hash = hash & hash
            }
            return Math.abs(hash)
        }

        return props.quizData.map((question, index) => ({
            ...question,
            answers: shuffleArray([
                question.correct_answer,
                ...(question.incorrect_answers || [])
            ], createSeed(question.question, index))
        }))
    }, [props.quizData])


    function calculateScore() {
        let score = 0
        for(let i = 0; i < preparedQuestions.length; i++) {
            if(selectedAnswers[i] === preparedQuestions[i].correct_answer) {
                score++
            }
        }
        return score
    }

    const answerButtons = (question, index) => {
        return question.answers.map((answer, answerIndex) => {
        if (submit) {
            // After submission - show correct/incorrect
            const isCorrect = answer === question.correct_answer;
            const isSelected = selectedAnswers[index] === answer;
            
            let buttonClass = 'answer-button';
            if (isSelected && isCorrect) {
                buttonClass += ' correct-selected';
            } else if (isSelected && !isCorrect) {
                buttonClass += ' incorrect-selected';
            } else if (!isSelected && isCorrect) {
                buttonClass += ' correct-not-selected';
            } else {
                buttonClass += ' not-selected';
            }
            
            return (
                <button 
                    key={answerIndex}
                    className={buttonClass}
                    disabled={true}
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            );
        } else {
            // Before submission - normal selection
            return (
                <button 
                    key={answerIndex}
                    className={`answer-button ${selectedAnswers[index] === answer ? 'selected' : ''}`}
                    onClick={() => handleAnswerClick(index, answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            );
        }
    });
}


    
    return(
        <main>
            <section className="questions-container">
                {preparedQuestions.map((question, index) => (
                    <div key={index} className="question-card">
                        <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
                        <div className="answers-grid">
                            {answerButtons(question, index)}
                        </div>
                    </div>
                ))}
                {!submit && <button className="submit-button" onClick={checkAnswers}>Check Answers</button>}
                {submit && (
                    <div className="results-section">
                        <p className="score-text">You scored {score}/{preparedQuestions.length} correct answers</p>
                        <button className="submit-button" onClick={() => {
                            setSubmit(false)
                            setSelectedAnswers({})
                            setScore(0)
                            props.onPlayAgain()
                        }}>Play Again</button>
                    </div>
                )}
            </section>
        </main>
    )
}