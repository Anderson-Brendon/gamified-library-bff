'use client'

import { IBookCard, IBookOnReadingList } from "@/app/type-definitions/book-interfaces";
import { useEffect, useState } from "react";
import BookCard from "../../ui/BookCard";

//buscar somentar não completados
async function fetchBooksOnReadingListByUserId(id: number, completed = false) {
    try {
        const response: Response = await fetch(`http://localhost:8080/users/reading-list/${id}?completed=${completed}`)
        const favorites: IBookOnReadingList[] | [] = await response.json();
        return favorites;
    } catch (error) {
        console.log(error)
        return [];
    }
}

//deletar somente se não foi completado
async function deleteOnListByBookId(bookId: number) {
    try {

        const response: Response = await fetch(`http://localhost:3000/api/users/favorites/${bookId}`, {
            method: "DELETE"
        })

        return response.ok;

    } catch (error) {
        console.log(error)
    }
}

export default function UserReadingList({ userId, isOwner }: { userId: number, isOwner: boolean }) {

    const [userBooks, setUserBooks] = useState<IBookOnReadingList[]>([]);

    const handleBookRemove = async (bookId: number) => {
        const isRemoved = await deleteOnListByBookId(bookId);
        if (isRemoved) {
            setUserBooks(userBooks.filter(book =>
                //manter apenas os objetos que não possuem essa id
                book.id != bookId
            ));
        }
    }

    useEffect(() => {
        const handleFavoritesFetching = async () => {
            const favorites: IBookOnReadingList[] | [] = await fetchBooksOnReadingListByUserId(userId);
            setUserBooks(favorites);
        }
        handleFavoritesFetching();
    }, [userId])

    return (
        <div>
            <section className="flex flex-wrap justify-around sm:justify-center sm:m-12 mt-15">
                {userBooks.map(book =>
                    <div key={book.id} className="mt-3 mb-3 sm:mr-4 flex flex-col items-center">
                        <div className={"flex justify-center items-center"}>
                            <label htmlFor="currentPage">Current page: </label>
                            <input readOnly={!isOwner} className={"w-8 text-center"} defaultValue={book.currentPage} type="number" name={"currentPage"} />
                        </div>
                        <a href={`/book/${book.slug}/${book.id}`}>
                            <BookCard book={book} />
                        </a>
                        {isOwner && <div>
                            <button>✅</button>
                            <button>❌</button>
                        </div>}
                    </div>
                )}
            </section>
        </div>
    )
}