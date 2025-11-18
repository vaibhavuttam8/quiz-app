export default function Questions(props) {

const quizQuestions = props.quizData?.map((question, index) => {

    

   if(question.type === 'multiple') {
        return (
        <div key={index}>
            <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            <div>
                <button dangerouslySetInnerHTML={{ __html: question.correct_answer }}></button>
                <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[0] }}></button>
                <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[1] }}></button>
                <button dangerouslySetInnerHTML={{ __html: question.incorrect_answers[2] }}></button>
            </div>
        </div>)
   }

   if(question.type === 'boolean'){
        return(
        <div key={index}>
            <h2 dangerouslySetInnerHTML={{__html: question.question}}></h2>
            <div>
                <button dangerouslySetInnerHTML={{__html: question.incorrect_answers[0]}}></button>
                <button dangerouslySetInnerHTML={{__html: question.correct_answer}}></button>
            </div>
        </div>
        )
   }
  
    })


    return(
        <main>
        <section className="questions">
        {quizQuestions}
        </section>
        </main>
    )
}