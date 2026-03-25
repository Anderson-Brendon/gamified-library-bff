"use client"

import { useEffect, useState } from "react";
import { fetchBooksOnReadingListByUserId } from "./userReadingList"
import { IBookOnReadingList } from "@/app/type-definitions/book-interfaces";
import BookCard from "../../ui/BookCard";

export default function UserCompletedBooks({ userId }: { userId: number }) {

    const [completedBooks, setCompletedBooks] = useState<IBookOnReadingList[]>([]);

    useEffect(() => {
        const handleCompletedFetching = async () => {
            const completedBooks: IBookOnReadingList[] = await fetchBooksOnReadingListByUserId(userId, true);
            setCompletedBooks(completedBooks);
        }
        handleCompletedFetching();
    }, [userId])

    return (
        <div>
            <section className="flex flex-wrap justify-around sm:justify-around sm:m-12 mt-15">
                {completedBooks.map(book =>
                    <div key={book.id} className="mt-3 mb-3 sm:mr-4 flex flex-col items-center">
                        <a href={`/book/${book.slug}/${book.id}`}>
                            <BookCard book={book} />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}