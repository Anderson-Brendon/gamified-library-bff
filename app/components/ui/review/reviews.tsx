'use client'

import { IReview } from "@/app/type-definitions/review";
import { Avatar, Rating } from "@mui/material";
import { useState } from "react";

async function fetchReviewsFromBook(BookId: number) {
    try {
        const response: Response = await fetch(`http://localhost:8080/reviews/${BookId}`);
        const reviews = await response.json();
        return reviews;
    } catch (error) {
        console.log();
        throw error;
    }
}

export function Reviews({ bookId }: { bookId: number }) {

    const [reviews, setReviews] = useState<IReview[]>([]);

    const [paginationValues, setPaginationValues] = useState({ start: 0, stop: 5 });

    const handleReviewsFetching = async () => {
        const reviews : IReview[] = await fetchReviewsFromBook(bookId);
        setReviews(reviews);
    }

    const handleReviewsSlicingForward = () => {
        setPaginationValues({start: paginationValues.start + 5, stop: paginationValues.stop + 5})
    }

    const handleReviewsSlicingBackward = () => {
        setPaginationValues({start: paginationValues.start - 5, stop: paginationValues.stop - 5})
    }

    const slicedReviews = reviews.slice(paginationValues.start, paginationValues.stop)

    return (
        <div id="book-reviews" className="mt-8 flex flex-col justify-center">
            <button disabled={reviews.length > 0} type={"button"} onClick={handleReviewsFetching} className="w-1/2 self-center border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                Check reviews
            </button>
            <div className="flex flex-col align-start m-4">
                {slicedReviews.map((r, ind) =>
                    <section key={ind} className="flex flex-col mt-4 mb-4">
                        <p>{r.user.username}</p>
                        <Avatar alt="Travis Howard" src={r.user.profilePic} />
                        <Rating className="pointer-events-none" value={r.rate} />
                        <p>{r.comment}</p>
                    </section>
                )}
            </div>

            <div className="flex justify-center">
                <button onClick={() => {handleReviewsSlicingBackward()}} className={`${paginationValues.start == 0  || reviews.length == 0 ? "hidden" : ""} border-2 border-black bg-white px-5 py-3 font-semibold text-black ring-2 ring-black ring-offset-2 ring-offset-yellow-300 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0` } >
                    {"<"}
                </button>
                <button onClick={() => { setReviews([]) }} type={"button"} className={`${reviews.length != 0 ? "" : "hidden"} border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0`}>
                    Close
                </button>
                <button  type={"button"} onClick={() => {handleReviewsSlicingForward()}} className={`${paginationValues.stop > reviews.length ? "hidden" : ""} border-2 border-black bg-white px-5 py-3 font-semibold text-black ring-2 ring-black ring-offset-2 ring-offset-yellow-300 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0`}>
                    {">"}
                </button>
            </div>
        </div>
    )
}

/*'use client'

import { IReview } from "@/app/type-definitions/review";
import { Avatar, Rating } from "@mui/material";
import { useState } from "react";

async function fetchReviewsFromBook(BookId: number) {
    try {
        const response: Response = await fetch(`http://localhost:8080/reviews/${BookId}`);
        const reviews = await response.json();
        return reviews;
    } catch (error) {
        console.log();
        throw error;
    }
}

export function Reviews({ bookId }: { bookId: number }) {

    const [reviews, setReviews] = useState<IReview[]>([]);

    const [paginationValues, setPaginationValues] = useState({start: 0, stop: 5});

    const [paginatedReviews, paginatedReviews] = useState<IReview[]>([]);

    const handleReviewsFetching = async () => {
        setReviews(await fetchReviewsFromBook(bookId));
    }

    return (
        <div id="book-reviews" className="mt-8">
            <button disabled={reviews.length > 0} type={"button"} onClick={handleReviewsFetching} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                Check reviews
            </button>
            <div>
            {reviews.map((r, ind) => 
                <section key={ind} className="flex flex-col">
                    <p>{r.user.username}</p>
                    <Avatar alt="Travis Howard" src={r.user.profilePic} />
                    <Rating name="half-rating-read" defaultValue={r.rate} readOnly />
                    <p>{r.comment}</p>
                </section>
            )}
            </div>
            <button onClick={() => {setReviews([])}} type={"button"} className={`${reviews.length > 0 ? "" : "hidden"} border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0`}>
                Close
            </button>
        </div>
    )
} */