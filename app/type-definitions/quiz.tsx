export interface QuizQuestion {
    correctOption: string,
    id: number,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    questionText: string
}

export interface UserAnswer{
    questionId: number,
    randomSelection: boolean,
    choosedOption: string,
    correctOption: string,
}

export interface QuizResult{
    randomAnswers: number
    correctAnswers: number,
    points: number,
}