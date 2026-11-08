"use client"

import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { QuizInteraction } from "./QuizInteraction";
import { springApiDomain } from "@/app/domains";
import { QuizQuestion, QuizResult } from "@/app/type-definitions/quiz";
import toast from "react-hot-toast";
import QuizRules from "./QuizRules";
import { QuizResultInfo } from "./QuizResultInfo";
import Loader from "@/app/components/common/Loader";

//caso o resultado já exista vai exibir o componente "QuizResultInfo"
async function getQuizResultByBookIdAndUserId(userId: number, bookId: number) {
    try {

        const response: Response = await fetch(`${springApiDomain}/quiz-results/${userId}/book/${bookId}`);
        if (response.status === 404) {
            return null;
        }
        const result: QuizResult = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }

}

async function getQuestions(bookId: number) {
    try {
        const response: Response = await fetch(`${springApiDomain}/books/${bookId}/quiz-questions`);
        const quizQuestions = await response.json();
        return quizQuestions;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export function QuizInitiator({ bookId, isLoggedIn, userId }: { bookId: number, isLoggedIn: boolean, userId: number }) {

    const [openModal, setOpenModal] = useState(false);

    const [startQuiz, setStartQuiz] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);

    const [userResult, setUserResult] = useState<QuizResult | null>(null);

    const handleQuizLaunch = async () => {

        setIsLoading(true);

        try {

            //checa se usuário está logado
            if (!isLoggedIn) {
                toast.dismiss()
                toast.error("You must create a account before answering the quiz 🙅");
                return;
            }

            //checa se o quiz já foi respondido
            const result = await getQuizResultByBookIdAndUserId(userId, bookId);

            if (result != null) {
                setUserResult(result);
                setOpenModal(true);
                return;
            }

            //busca as questões do quiz e se for maior igual a 10 muda o estado de quizquestions
            const questions: QuizQuestion[] = await getQuestions(bookId);

            if (questions.length === 10) {
                setQuizQuestions(questions);
                setOpenModal(true);
            } else {
                toast.error("No quiz available for this book yet 🕵")
            }

        } catch (error) {
            console.log(error);
            toast.error("Something is not working 😥");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ?
                (<Loader />) :

                (<div>
                    <button onClick={handleQuizLaunch} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                        Quiz
                    </button>

                    <Modal open={openModal}>

                        <Box>

                            {(userResult == null && startQuiz == false) && <QuizRules
                                startFunction={() => { setStartQuiz(true) }}
                                closeFunction={() => { setOpenModal(false) }} />}

                            {(startQuiz && quizQuestions != null && userResult == null) && <QuizInteraction resultSetter={(result: QuizResult) => {setUserResult(result)}} questions={quizQuestions} bookId={bookId}/>}

                            {userResult && <QuizResultInfo closeFunction={() => {setOpenModal(false)}} result={userResult} />}

                        </Box>

                    </Modal>
                </div>)}

        </>)
}