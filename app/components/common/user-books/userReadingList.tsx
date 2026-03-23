'use client'

import { IBookOnReadingList } from "@/app/type-definitions/book-interfaces";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import BookCard from "../../ui/BookCard";
import { debounce } from "lodash";
import { nextApiDomain, springApiDomain } from "@/app/domains";

//buscar somentar não completados
async function fetchBooksOnReadingListByUserId(id: number, completed = false) {
    try {
        const response: Response = await fetch(`${springApiDomain}/users/reading-list/${id}?completed=${completed}`)
        const favorites: IBookOnReadingList[] | [] = await response.json();
        return favorites;
    } catch (error) {
        console.log(error)
        return [];
    }
}

async function deleteFromListByBookId(bookId: number) {
    try {

        const response: Response = await fetch(`${nextApiDomain}/api/users/reading-list/${bookId}`, {
            method: "DELETE"
        })

        return response.ok;

    } catch (error) {
        console.log(error)
    }
}

async function updateCurrentPageBeingRead(currentPage: number, bookId: number) {

    const response: Response = await fetch(`${nextApiDomain}/api/users/reading-list/${bookId}`,
        {
            body: JSON.stringify({ currentPage: currentPage }),
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    return response.ok;

}

export default function UserReadingList({ userId, isOwner }: { userId: number, isOwner: boolean }) {

    const [userBooks, setUserBooks] = useState<IBookOnReadingList[]>([]);

    const debouncedPageUpdate = useRef(debounce( async (pageNumber, bookId) => { 
        const result = await updateCurrentPageBeingRead(pageNumber, bookId);

        if (result) {
            console.log("Book was updated")
            return;
        }

    }, 1000)).current;

    const handleCurrentPageUpdate = async (event: ChangeEvent<HTMLInputElement>, bookId: number) => {

        const input: HTMLInputElement = event.target;

        debouncedPageUpdate(Number(input.value), bookId);

    }

    const handleBookRemoving = async (bookId: number) => {
        const isRemoved = await deleteFromListByBookId(bookId);

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
            <section className="flex flex-wrap justify-around sm:justify-around sm:m-12 mt-15">
                {userBooks.map(book =>
                    <div key={book.id} className="mt-3 mb-3 sm:mr-4 flex flex-col items-center">
                        <div className={"flex justify-center items-center"}>
                            <label htmlFor="currentPage">Current page: </label>
                            <input onChange={(e) => handleCurrentPageUpdate(e, book.id)} readOnly={!isOwner} className={"w-8 text-center"} defaultValue={book.currentPage} type="number" name={"currentPage"} />
                        </div>
                        <a href={`/book/${book.slug}/${book.id}`}>
                            <BookCard book={book} />
                        </a>
                        {isOwner && <div>
                            <button>✅</button>
                            <button onClick={() => { handleBookRemoving(book.id) }}>❌</button>
                        </div>}
                    </div>
                )}
            </section>
        </div>
    )
}

/*

async function updateCurrentPageBeingRead(currentPage: number, bookId: number) {

    const response: Response = await fetch(`http://localhost:3000/api/users/reading-list/${bookId}`,
        {
            body: JSON.stringify({ currentPage: currentPage }),
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    return response.ok;

}

const debouncer = debounce(async () => {

        const result = await updateCurrentPageBeingRead(parseInt(input.value), bookId);

        if (result) {
            console.log("Book was updated")
            return;
        }

    }, 1000)

    debouncer();
*/