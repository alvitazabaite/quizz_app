import Answer from "./Answer.jsx";
import {useContext} from "react";
import {QuizContext} from "../contexts/Quiz.jsx";
import quiz from "./Quiz.jsx";

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const questionData = quizState.questions[quizState.currentQuestionIndex];
    return (
        <div>
            <div className="question">{questionData.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) => (
                    <Answer
                        answerText={answer}
                        key={index}
                        index = {index}
                        currentAnswer = {quizState.currentAnswer}
                        correctAnswer = {questionData.correctAnswer}
                        onSelectAnswer={(answerText) =>
                            dispatch({type: "SELECT_ANSWER", payload: answerText})}/>
                ))}
            </div>
        </div>
    )
}

export default Question