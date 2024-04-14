import question from "./components/Question.jsx";

export const shuffleAnswers = (question) => {
    const unshuffledAnswers = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ]
    return unshuffledAnswers
        .map(answer => ({
            sort: Math.random(),
            value: answer
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);
};

export const normalizeQuestions = (backQuestions) => {
    return backQuestions.map(backQuestion => {
        const incorrectAnswers = backQuestion.incorrect_answers.map(incorrectAnswer =>
            decodeURIComponent(incorrectAnswer));
        return {
            correctAnswer: decodeURIComponent(backQuestion.correct_answer),
            question: decodeURIComponent(backQuestion.question),
            incorrectAnswers,
        }
    })
}