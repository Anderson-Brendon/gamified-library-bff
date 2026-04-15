"use client"

import { nextApiDomain } from "@/app/domains";
import { IReviewUpload } from "@/app/type-definitions/review";
import { Rating } from "@mui/material";
import { useState } from "react";

async function patchReview(bookId: number, editedReview: IReviewUpload) {
    try {
        const response: Response = await fetch(`${nextApiDomain}/api/users/reviews/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedReview),
            method: 'PATCH'
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error)
    }
}

export default function ReviewEditor({ closeFunction, onResponse, review, reviewSetter, bookId }: { closeFunction: () => void, onResponse: (message: string) => void, review: IReviewUpload, reviewSetter: (updatedReview: IReviewUpload) => void, bookId: number }) {

    const [draftReview, setDraftReview] = useState<IReviewUpload>(review)

    const handleReviewModification = async (target: HTMLButtonElement) => {
        if (draftReview.rate >= 1 && draftReview.comment.length > 0) {
            try {
                target.disabled = true
                const response = await patchReview(bookId, draftReview);
                if (response) {
                    reviewSetter(draftReview);
                    onResponse("Review was updated!")
                    closeFunction();
                }
            } catch (error) {
                console.log(error);
            } finally {
                target.disabled = false;
            }
        }
        return;
    }

    return (
        <div >
            <div className="flex justify-center flex-col">
                <h2 className="text-sm font-semibold text-center">My review</h2>
                <div className="flex items-center mt-4">
                    <span className="text-sm font-semibold">Rate it from 1 to 5: </span>
                    <Rating
                        precision={1}
                        value={draftReview.rate}
                        onChange={(event, newValue) => {
                            setDraftReview({
                                rate: newValue ?? 1,
                                comment: draftReview.comment
                            });
                        }} />
                </div>
            </div>
            <div>
                <label htmlFor="Notes">
                    <div className="relative mt-0.5 overflow-hidden border-2 border-black shadow-[4px_4px_0_0] focus-within:ring-2 focus-within:ring-yellow-300">
                        <textarea placeholder={"Type your comment here"} onChange={(e) => { setDraftReview({ rate: draftReview.rate, comment: e.target.value }) }} value={draftReview.comment} maxLength={255} id="Notes" className="w-full resize-none border-0 focus:ring-0 sm:text-sm text-center" rows={4}></textarea>

                        <div className="flex items-center justify-end gap-3 border-t-2 border-black p-3">
                            {/*close*/}
                            <button onClick={closeFunction} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/*reset*/}
                            <button onClick={() => { setDraftReview(review) }} type="button" className="border-2 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                </svg>

                            </button>
                            {/*send*/}
                            <button onClick={(e) => { handleReviewModification(e.currentTarget) }} type="button" className="border-2 bg-green-300 px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0] hover:bg-green-400 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </label>
            </div>
        </div>)
}