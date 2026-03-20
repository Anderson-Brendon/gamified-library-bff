'use client'

import { IBookCard } from "@/app/type-definitions/book-interfaces";
import { useEffect, useState } from "react";
import BookCard from "../../ui/BookCard";

async function fetchFavoriteBooksByUserId(id: number) {
    try {
        const response: Response = await fetch(`http://localhost:8080/users/favorites/${id}`)
        const favorites: IBookCard[] | [] = await response.json();
        return favorites;
    } catch (error) {
        console.log(error)
        return [];
    }
}

//api vai deletar usando o id que vier no token
async function deleteFavoriteByBookId(bookId: number) {
    try {

        const response: Response = await fetch(`http://localhost:3000/api/users/favorites/${bookId}`, {
            method: "DELETE"
        })

        return response.ok;
        
    } catch (error) {
        console.log(error)
    }
}

export default function UserFavoriteBooks({ userId, isOwner }: { userId: number, isOwner: boolean }) {

    const [favoriteBooks, setFavoritesBooks] = useState<IBookCard[]>([]);

    const handleBookRemove = async (bookId : number) => {
        const isRemoved = await deleteFavoriteByBookId(bookId);
        if(isRemoved){
            setFavoritesBooks(favoriteBooks.filter(book => 
                //manter apenas os objetos que não possuem essa id
                book.id != bookId
            ));
        }
    }

    useEffect(() => {
        const handleFavoritesFetching = async () => {
            const favorites: IBookCard[] | [] = await fetchFavoriteBooksByUserId(userId);
            setFavoritesBooks(favorites);
        }
        handleFavoritesFetching();
    }, [userId])

    return (
        <div>
            <section className="flex flex-wrap justify-around sm:justify-center sm:m-12 mt-15">
                {favoriteBooks.map(book =>
                <div key={book.id} className="mt-3 mb-3 sm:mr-4 flex flex-col items-center">
                    <a  href={`/book/${book.slug}/${book.id}`}>
                        <BookCard book={book} />
                    </a>
                    {isOwner && <button onClick={() => {handleBookRemove(book.id)}}>Remove</button>}
                </div>
                    
                )}
            </section>
        </div>
    )
}