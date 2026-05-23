"use client"

import { QuizQuestion, QuizResult, UserAnswer } from "@/app/type-definitions/quiz";
import { useEffect, useRef, useState } from "react";
import { nextApiDomain } from "@/app/domains";
import Loader from "@/app/components/common/Loader";


async function postUserAnswers(userAnswers: UserAnswer[], bookId: number) {
    try {
        const response = await fetch(`${nextApiDomain}/api/users/quiz/${bookId}`, {
            method: 'POST',
            body: JSON.stringify(userAnswers),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            return result;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export function QuizInteraction({ questions, bookId, resultSetter }: { questions: QuizQuestion[], bookId: number, resultSetter: (result: QuizResult) => void }) {

    const [secondsToAnswer, setSecondsToAnswer] = useState(30);

    const intervalId = useRef<number>(0);

    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(questions[0]);

    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

    const [selectedOption, setSelectedOption] = useState<string>("");

    const [quizCompleted, setQuizCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const options = ["A", "B", "C", "D"];

    const startCounter = () => {
        intervalId.current = counter.current();
    }

    const stopCounter = () => {
        clearInterval(intervalId.current)
    }

    const handleRandomOptionSelection = () => {

        const position = Math.floor(Math.random() * 4);

        const randomOption = options[position];

        const answer: UserAnswer = {
            questionId: currentQuestion!.id,
            randomSelection: true,
            selectedOption: randomOption,
            correctOption: currentQuestion.correctOption
        }

        setUserAnswers(userAnswers.concat(answer));

        setSecondsToAnswer(30)

    }

    const handleOptionSelection = (option: string) => {

        const answer: UserAnswer = {
            questionId: currentQuestion!.id,
            randomSelection: false,
            selectedOption: option,
            correctOption: currentQuestion.correctOption
        }

        setUserAnswers(prev => prev.concat(answer));

        console.log(selectedOption)
    }

    const counter = useRef(() => {
        return window.setInterval(() => {

            setSecondsToAnswer((prev) => {
                if (prev <= 1) {
                    handleRandomOptionSelection()
                    return 30;
                }
                return --prev;
            })

        }, 1000);
    });

    useEffect(() => {

        const handleUserAnswersPosting = async () => {
            setIsLoading(true);
            try {
                const result = await postUserAnswers(userAnswers, bookId);
                resultSetter(result);
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }

        const getNextQuestion = () => {
            //se o comprimento das respostas for igual a qtd de questões o quiz deve parar e enviar as respostas, caso contrário continua
            if (userAnswers.length == questions.length) {
                stopCounter();
                setQuizCompleted(true);
                handleUserAnswersPosting();
                return;
            } else {
                const nextPosition = userAnswers.length;
                setCurrentQuestion(questions[nextPosition]);
                setSelectedOption("A");
                setSecondsToAnswer(30);
            }
        }

        if (intervalId.current === 0) {
            startCounter();
        }

        getNextQuestion();

    }, [questions, userAnswers, bookId, resultSetter])

    return (
        <>
        {
            isLoading && <Loader />
        }
            {(!quizCompleted && !isLoading) &&
                <>
                    <p>{secondsToAnswer}</p>
                    <p>{currentQuestion?.questionText}</p>
                    <fieldset className="space-y-3">
                        <legend>Select a answer:</legend>
                        <div>
                            <label htmlFor="optionA" className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600">
                                <div>
                                    <p className="text-gray-700">A</p>

                                    <p className="text-gray-900">{currentQuestion!.optionA}</p>
                                </div>

                                <input checked={selectedOption === "A"} type="radio" onChange={(e) => { setSelectedOption(e.target.value) }} name="option" value={options[0]} id="optionA" className="size-5 border-gray-300" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="optionB" className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600">
                                <div>
                                    <p className="text-gray-700">B</p>

                                    <p className="text-gray-900">{currentQuestion!.optionB}</p>
                                </div>

                                <input checked={selectedOption === "B"} type="radio" onChange={(e) => { setSelectedOption(e.target.value) }} name="option" value={options[1]} id="optionB" className="size-5 border-gray-300" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="optionC" className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600">
                                <div>
                                    <p className="text-gray-700">C</p>

                                    <p className="text-gray-900">{currentQuestion!.optionC}</p>
                                </div>

                                <input checked={selectedOption === "C"} type="radio" onChange={(e) => { setSelectedOption(e.target.value) }} name="option" value={options[2]} id="optionC" className="size-5 border-gray-300" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="optionD" className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600">
                                <div>
                                    <p className="text-gray-700">D</p>

                                    <p className="text-gray-900">{currentQuestion!.optionD}</p>
                                </div>

                                <input checked={selectedOption === "D"} type="radio" onChange={(e) => { setSelectedOption(e.target.value) }} name="option" value={options[3]} id="optionD" className="size-5 border-gray-300" />
                            </label>
                        </div>
                    </fieldset>
                    <div className="flex flex-row">
                        <button onClick={() => { handleOptionSelection(selectedOption) }} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                            Select
                        </button >
                        <button onClick={() => { handleRandomOptionSelection() }} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                            Random option
                        </button >
                    </div>
                </>}
        </>)
}

/* */

/*const checkIfQuizIsCompleted = () => {
            if (userAnswers.length == questions.length) {
                stopCounter();
                setQuizCompleted(true);
                return;
            }
        }*/