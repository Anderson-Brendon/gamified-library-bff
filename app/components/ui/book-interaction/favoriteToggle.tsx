"use client";

import { nextApiDomain, springApiDomain } from "@/app/domains";
import { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";
import { deleteFavoriteByBookId } from "../../common/user-books/userFavoriteBooks";


async function checkIfBookIsAFavorite(userId: number, bookId: number) {
    try {
        const response: Response = await fetch(`${springApiDomain}/favorite-books/${userId}/contains/${bookId}`)
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

async function addBookToFavorites(bookId: number) {
    try {
        console.log(`${nextApiDomain}/api/users/favorites/${bookId}`)
        const response: Response = await fetch(`${nextApiDomain}/api/users/favorites/${bookId}`, {
            method: "POST"
        })
        return response.ok
    } catch (error) {
        console.log(error)
    }
}

export default function FavoriteToggle({ bookId, userId }: { bookId: number, userId: number }) {

    const [isFavorite, setIsFavorite] = useState(false)

    const [isToggleDisabled, setIsToggleDisabled] = useState(false)

    //quando o componente for montado chama a função pra checar se o livro está na lista do usuário
    useEffect(() => {
        checkIfBookIsAFavorite(userId, bookId).then(json => {
            console.log(json.isFavorite)
            setIsFavorite(json.isFavorite)
        });
    }, [userId, bookId])

    const handleBookAddition = async (bookId: number) => {
        setIsToggleDisabled(true)
        const result = await addBookToFavorites(bookId);
        if (result) {
            console.log("livro adicionado aos favoritos");
            setIsFavorite(true)
            setIsToggleDisabled(false)
        }
    }

    const handleBookRemoving = async (bookId: number) => {
        setIsToggleDisabled(true);
        let result;
        try {
            result = await deleteFavoriteByBookId(bookId);
            if (result) {
                console.log("livro removido dos favoritos");
                setIsFavorite(false);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsToggleDisabled(false);
        }
    }

    return (<ToggleButton disabled={isToggleDisabled} clickHandler={() => isFavorite ? handleBookRemoving(bookId) : handleBookAddition(bookId)} isOnList={isFavorite} onListText="Remove from favorites" outOfListText="Add to favorites" />)
}