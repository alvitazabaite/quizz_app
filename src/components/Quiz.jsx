import Question from "./Question.jsx";
import {useContext, useEffect} from "react";
import {QuizContext} from "../contexts/Quiz.jsx";

const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    useEffect(() => {
        if (quizState.questions.length > 0 || quizState.error) return;
        fetch('https://opentdb.com/api.php?amount=14&category=15&difficulty=easy&type=multiple&encode=url3986')
            .then(res => res.json())
            .then(data => {
                dispatch({type: "LOADED_QUESTIONS", payload: data.results});
            }).catch(err => {
            dispatch({type: "SERVER_ERROR", payload: err.message});
        })
    });

    return (
        <div className="quiz">
            {quizState.error && (
                <div className="results">
                    <div className="congratulations">Server error</div>
                    <div className="results-info">
                        <div>{quizState.error}</div>
                    </div>
                </div>
            )}
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div>You have completed the the quiz!</div>
                        <div>You've got {quizState.correctAnswersCount} of {quizState.questions.length} questions</div>
                    </div>
                    <div className="next-button" onClick={() => dispatch({type: "RESTART"})}>Restart</div>
                </div>
            )}
            {!quizState.showResults && quizState.questions.length > 0 && (
                <div>
                    <div className="score">
                        Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
                    </div>
                    <Question/>
                    <div className="next-button" onClick={() => dispatch({type: "NEXT_QUESTION"})}>Next Question
                    </div>
                </div>
            )}
        </div>
    )
}

export default Quiz