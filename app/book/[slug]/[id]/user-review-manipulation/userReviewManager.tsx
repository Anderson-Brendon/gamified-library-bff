"use client";

import { springApiDomain } from "@/app/domains"
import { IReviewUpload } from "@/app/type-definitions/review";
import { useEffect, useRef, useState } from "react";
import ReviewUploader from "./reviewUploader";
import ReviewEditor from "./reviewEditor";
import { Alert, Box, Modal, Snackbar } from "@mui/material";

async function fetchReview(bookId: number, userId: number) {
    try {
        const response: Response = await fetch(`${springApiDomain}/reviews/${bookId}/user/${userId}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error)

    }
}

//responsavel por orquestrar a lógica da exibição do upload e edição da review
export default function UserReviewManager({ bookId, userId }: { bookId: number, userId: number }) {

    const [openModal, setOpenModal] = useState(false);

    //state da review do user
    const [userReview, setUserReview] = useState<IReviewUpload | null>(null);

    //state booleano para exibir o snackbar
    const [openSnack, setOpenSnack] = useState(false);

    //state string que será ei
    const [snackText, setSnackText] = useState('');

    //função que alterna abertura do dialog
    const handleReviewAreaOpening = () => {
        setOpenModal(!openModal);
    }

    //faz o fetch da review associada ao id do livro e user
    useEffect(() => {
        fetchReview(bookId, userId).then(result => setUserReview(result));
    }, [bookId, userId])

    return (

        <section className="flex flex-col justify-center">


            <button onClick={() => { handleReviewAreaOpening() }} className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                <span className="relative z-10"> {userReview ? "Edit Review" : " Create review"}</span>
            </button>


            <Modal open={openModal} slotProps={{
                backdrop: {
                    sx: { backgroundColor: "rgba(0,0,0,0.5)" }
                }
            }}>

                <Box className="bg-white w-full max-w-xl p-6 rounded-lg border-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/*se o state userReview for diferente de nulo exibe o componente pra editar */}
                    {userReview &&
                        <>
                            <ReviewEditor bookId={bookId} reviewSetter={setUserReview} closeFunction={handleReviewAreaOpening} review={userReview} onResponse={(message: string) => { setOpenSnack(true); setSnackText(message) }} />
                        </>
                    }

                    {userReview == null &&
                        <>
                            <ReviewUploader onResponse={(message: string, postedReview: IReviewUpload) => { setSnackText(message); setOpenSnack(true); setUserReview(postedReview) }} bookId={bookId} closeFunction={handleReviewAreaOpening} />
                        </>
                    }
                </Box>

            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnack}
                autoHideDuration={5000}
                onClose={() => { setOpenSnack(false) }}
            >
                <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                    {snackText}
                </Alert>
            </Snackbar>
        </section>
    )
}
/*
"use client";

import { springApiDomain } from "@/app/domains"
import { IReviewUpload } from "@/app/type-definitions/review";
import { useEffect, useRef, useState } from "react";
import ReviewUploader from "./reviewUploader";
import ReviewEditor from "./reviewEditor";
import { Alert, Snackbar } from "@mui/material";

async function fetchReview(bookId: number, userId: number) {
    try {
        const response: Response = await fetch(`${springApiDomain}/reviews/${bookId}/user/${userId}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error)

    }
}

//responsavel por orquestrar a lógica da exibição do upload e edição da review
export default function ReviewHandler({ bookId, userId }: { bookId: number, userId: number }) {

    //referência a tag dialog pra exibir um popup
    const reviewArea = useRef<HTMLDialogElement>(null)

    //state da review do user
    const [userReview, setUserReview] = useState<IReviewUpload | null>(null);

    //state booleano para exibir o snackbar
    const [openSnack, setOpenSnack] = useState(false);

    //state string que será ei
    const [snackText, setSnackText] = useState('');

    //função que alterna abertura do dialog
    const handleReviewAreaOpening = () => {

        if (reviewArea.current?.open) {
            reviewArea.current?.close()
        } else {
            reviewArea.current?.showModal()
        }
    }

    //faz o fetch da review associada ao id do livro e user
    useEffect(() => {
        fetchReview(bookId, userId).then(result => setUserReview(result));
    }, [bookId, userId])

    return (

        <section className="flex flex-col justify-center">


            <button onClick={() => { handleReviewAreaOpening() }} className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                <span className="relative z-10"> {userReview ? "Edit Review" : " Create review"}</span>
            </button>

            
            <dialog className="w-full max-w-xl p-6 rounded-lg border-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/50" ref={reviewArea} >

            {/*se o state userReview for diferente de nulo exibe o componente pra editar 
                {userReview &&
                    <>
                        <ReviewEditor bookId={bookId} reviewSetter={setUserReview} closeFunction={handleReviewAreaOpening} review={userReview} onResponse={(message: string) => { setOpenSnack(true); setSnackText(message)}}/>
                    </>
                }

                {userReview == null &&
                    <>
                        <ReviewUploader  onResponse={(message: string, postedReview: IReviewUpload) => { setSnackText(message); setOpenSnack(true); setUserReview(postedReview)}} bookId={bookId} closeFunction={handleReviewAreaOpening} />
                    </>
                }

            </dialog>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnack}
                autoHideDuration={5000}
                onClose={() => { setOpenSnack(false) }}
            >
            <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                    {snackText}
                </Alert>
            </Snackbar>
        </section>
    )
}
*/