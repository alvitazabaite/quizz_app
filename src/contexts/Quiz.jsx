import {createContext, useReducer} from "react";
import questions from '../data.js'
import {normalizeQuestions, shuffleAnswers} from "../helpers.js";


const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: "",
    correctAnswersCount: 0,
    error: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SELECT_ANSWER" : {
            const correctAnswerCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer
                ? state.correctAnswersCount + 1
                : state.correctAnswersCount
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount: correctAnswerCount,
            }
        }
        case "NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults ?
                state.currentQuestionIndex :
                state.currentQuestionIndex + 1;
            const answers = showResults ?
                [] :
                shuffleAnswers(state.questions[currentQuestionIndex])
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: ""
            }
        }
        case "RESTART": {
            return initialState
        }
        case "LOADED_QUESTIONS": {
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0])
            }
        }
        case "SERVER_ERROR": {
            return {
                ...state,
                error: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}