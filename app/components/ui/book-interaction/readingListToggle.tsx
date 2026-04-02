"use client"

import { nextApiDomain, springApiDomain } from "@/app/domains";
import { deleteFromListByBookId } from "../../common/user-books/userReadingList";
import { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";

async function addBookToReadingList(bookId: number) {
    try {
        const response: Response = await fetch(`${nextApiDomain}/api/users/reading-list/${bookId}`, {
            method: "POST"
        })
        return response.ok
    } catch (error) {
        console.log(error)
    }
}

async function checkIfBookExistsOnList(userId: number, bookId:number){
    try {
        const response: Response = await fetch(`${springApiDomain}/reading-list/${userId}/contains/${bookId}`)
        if(response.ok){
            return await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export default function ReadingListToggle({ bookId, userId }: { bookId: number, userId : number}) {

    const [isOnReadingList, setIsOnList] = useState(false)

    //quando o componente for montado chama a função pra checar se o livro está na lista do usuário
    useEffect(() => {
        checkIfBookExistsOnList(userId, bookId).then(json =>  {
            console.log(json.isOnReadingList)
            setIsOnList(json.isOnReadingList)});
    }, [userId, bookId])

    const handleBookAddition = async (bookId: number) => {
         const result = await addBookToReadingList(bookId);
         if(result){
            console.log("livro adicionado na lista");
            setIsOnList(true)
         }
    }

    const handleBookRemoving = async (bookId: number) => {
       const result = await deleteFromListByBookId(bookId);

       if(result){
         console.log("livro removido da lista");
         setIsOnList(false);
       }
    }

    return (<ToggleButton disabled={false} clickHandler={() => isOnReadingList ? handleBookRemoving(bookId) : handleBookAddition(bookId)} isOnList={isOnReadingList} onListText="Remove from Reading List" outOfListText="Add to reading list" />)
}