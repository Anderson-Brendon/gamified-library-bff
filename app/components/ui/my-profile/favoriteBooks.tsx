import { IBookCard } from "@/app/type-definitions/book-interfaces";
import { useState } from "react";

async function fetchFavoriteBooksByUserId(id: number) {
    try {
        const response: Response = await fetch(`http://localhost:8080/users/favorites${id}`)
        const favorites: IBookCard[] = await response.json();
        return favorites;
    } catch (error) {
        console.log(error)
    }
}

export default function FavoriteBooks({userId} : {userId : number}) {

    const [favoriteBooks, setFavoritesBooks] = useState<IBookCard[]>();

    const handleFavoritesFetching = async (id: number) => {

        const favorites = await fetchFavoriteBooksByUserId(id);

        setFavoritesBooks(favorites);
        
    }

    return (
        <div>
           <button onClick={() => {handleFavoritesFetching(userId)}} className={"border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0"}>
                Favorites
            </button>
        </div> 
    )
}