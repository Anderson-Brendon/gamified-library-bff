"use client"

import { nextApiDomain } from "@/app/domains";
import { IReviewUpload } from "@/app/type-definitions/review";
import { Rating } from "@mui/material";
import { useState } from "react";

async function postReview(bookId: number, userRate: number = 1, userComment: string) {

    const userReview = {
        rate: userRate,
        comment: userComment
    }

    try {
        const response: Response = await fetch(`${nextApiDomain}/api/users/reviews/${bookId}`, {
            body: JSON.stringify(userReview),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export default function ReviewUploader({ closeFunction, bookId, onResponse }: { closeFunction: () => void, bookId: number, onResponse: (message: string, postedReview: IReviewUpload) => void }) {

    const snackAdvices = { success: "Review was created!", exception: "Something went wrong!", commentTooShort: "Please, insert at least a single character :/" }

    const [userReview, setUserReview] = useState<IReviewUpload>({ rate: 1, comment: '' });

    const handleReviewUpload = async (target: HTMLButtonElement) => {
        try {
            target.disabled = true;
            if (userReview.comment.length > 0 && userReview.rate >= 1) {
                const responseResult = await postReview(bookId, userReview.rate, userReview.comment);
                onResponse(responseResult ? snackAdvices.success : snackAdvices.exception, userReview);
                closeFunction();
            }
        } catch (error) {
            console.log(error)
        } finally {
            target.disabled = true;
        }
    }

    return (
        <div>
            <div className="flex justify-center flex-col">
                <span className="text-sm font-semibold text-center">Create a review</span>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-semibold">Rate it from 1 to 5: </span>
                    <Rating
                        precision={1}
                        value={userReview.rate}
                        onChange={(event, newValue) => {
                            setUserReview({
                                rate: newValue ?? 1,
                                comment: userReview.comment
                            });
                        }} />
                </div>
            </div>
            <div>
                <label htmlFor="Notes">
                    <div className="relative mt-0.5 overflow-hidden border-2 border-black shadow-[4px_4px_0_0] focus-within:ring-2 focus-within:ring-yellow-300">
                        <textarea placeholder={"Type your comment here"} onChange={(e) => { setUserReview({ rate: userReview.rate, comment: e.target.value }) }} value={userReview?.comment} maxLength={255} id="Notes" className="w-full resize-none border-0 focus:ring-0 sm:text-sm text-center" rows={4}></textarea>

                        {/* close, clear, and send buttons*/}
                        <div className="flex items-center justify-end gap-3 border-t-2 border-black p-3">
                            <button onClick={closeFunction} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button onClick={() => { setUserReview({ rate: userReview.rate, comment: '' }) }} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button onClick={(e) => { handleReviewUpload(e.currentTarget) }} type="button" className="border-2 bg-green-300 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-green-400 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </label>
            </div>
        </div>

    )
}

/*
export default function ReviewUploader({ closeFunction, bookId, onResponse, reviewSetter }: { reviewSetter: (review: IReviewUpload) => void, closeFunction: () => void, bookId: number, onResponse: (message: string, postedReview: IReviewUpload) => void }) {

    const snackAdvices = {success: "Review was created!", exception: "Something went wrong!", commentTooShort: "Please, insert at least a single character :/"}

    const [userReview, setUserReview] = useState<IReviewUpload>({ rate: 1, comment: '' });

    const handleReviewUpload = async () => {
        if (userReview.comment.length > 0 && userReview.rate >= 1) {
            const responseResult = await postReview(bookId, userReview.rate, userReview.comment);
            onResponse(responseResult ? snackAdvices.success : snackAdvices.exception, userReview);
            closeFunction();
        }
    }

    return (
        <div>
            <div className="flex justify-center flex-col">
                <span className="text-sm font-semibold">Create a review</span>
                <Rating value={userReview.rate} onChange={(event, newValue) => {
                    setUserReview({
                        rate: newValue ?? 1,
                        comment: userReview.comment
                    });
                }} />
            </div>
            <div>
                <label htmlFor="Notes">
                    <div className="relative mt-0.5 overflow-hidden border-2 border-black shadow-[4px_4px_0_0] focus-within:ring-2 focus-within:ring-yellow-300">
                        <textarea onChange={(e) => { setUserReview({ rate: userReview.rate, comment: e.target.value }) }} value={userReview?.comment} maxLength={255} id="Notes" className="w-full resize-none border-0 focus:ring-0 sm:text-sm" rows={4}></textarea>

                        <div className="flex items-center justify-end gap-3 border-t-2 border-black p-3">
                            <button onClick={closeFunction} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                Close
                            </button>

                            <button onClick={() => {setUserReview({rate: userReview.rate, comment: ''})}} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                Clear
                            </button>

                            <button onClick={handleReviewUpload} type="button" className="border-2 bg-yellow-300 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-400 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                Save
                            </button>
                        </div>
                    </div>
                </label>
            </div>
        </div>

    )
}
*/