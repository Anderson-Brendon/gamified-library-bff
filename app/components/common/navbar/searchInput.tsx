'use client'

import { ChangeEvent, useState } from "react";
import SearchResultCard from "./searchResultCard";
import { IBookCard } from "@/app/type-definitions/book-interfaces";
import { debounce } from "lodash";
import { useRef } from "react";


async function fetchBooksByLike( text: string ) {

    try {
        const response: Response = await fetch(`http://localhost:8080/books/like/${text}`);
        if (response.status == 401) {
            return null;
        }
        const foundBooks = await response.json();
        return foundBooks;
    } catch (error) {
        console.log(error)
    }

}


export default function SearchInput() {

    const [booksList, setBooksList] = useState<IBookCard[]>([]);

    const [userInput, setUserInput] = useState<string>("");

    const [foundResult, setfoundResult] = useState("");

    const debouncedSearch = useRef(debounce(async (text) => {
        if(text != ""){
            const books = await fetchBooksByLike(text)
            setBooksList(books);
            setfoundResult(books.length > 0 ? "" : " Books not found")
        };
    }, 1000)).current

    const handleUserInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.trim();
        
        setUserInput(inputValue)

        if (inputValue === "") {
            setBooksList([]);
            setfoundResult("");
            debouncedSearch.cancel();
            return;
        }

        debouncedSearch(inputValue);
    }

    return (
    <div >
        
        <div className="w-48 sm:w-auto flex border-2 shadow-[4px_4px_0_0] focus-within:ring-2 focus-within:ring-yellow-300">
            <input placeholder="Find books" maxLength={15} onChange={(event) => {handleUserInputChange(event);}} value={userInput} type={"text"} id="Search" className="text-center w-full border-none focus:ring-0 sm:text-sm" />
            <span className="hidden bg-yellow-300 px-4 py-2 text-xs/none font-bold tracking-wide uppercase hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-0">
                S
            </span>
            <button onClick={() => {setBooksList([]); setUserInput("");setfoundResult("")}} type={"button"}>X</button>
        </div>
   
    <div style={{zIndex:"1000"}} className={`${booksList.length > 0 ? "" : "hidden "}flex flex-row flex-wrap justify-around left-0 z-index:40 absolute green-glass-effect`}>
        {booksList.map((book: IBookCard) => 
        <SearchResultCard key={book.id} book={book} />
    )}
    </div>
    <p className="text-center">{foundResult}</p> 
    </div>
    )
}


/*'use client'

import { ChangeEvent, useEffect, useState } from "react";
import SearchResultCard from "./searchResultCard";
import { IBookCard } from "@/app/type-definitions/Ibook";

async function fetchBooksByLike( text: string ) {

    try {
        const response: Response = await fetch(`http://localhost:8080/books/like/${text}`);
        if (response.status == 401) {
            return null;
        }
        const foundBooks = await response.json();
        return foundBooks;
    } catch (error) {
        console.log(error)
    }

}


export default function SearchInput() {

    

    const [booksList, setbooksList] = useState([]);

    const [userInput, setUserInput] = useState<string>("");

    const handleUserInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value.trim())
        console.log(event.target.value)
    }

    const handleSearch = async () => {
        if(userInput != ""){
            setbooksList(await fetchBooksByLike(userInput))
            console.log(booksList[0]);
        }
    }

    const handleEmptyInput = () => {
        if(userInput == ''){
            setbooksList([]);
        }
    }

    useEffect(() => {
        if (userInput === "") {
            setbooksList([]);
        }
    }, [userInput]);

    return (
    <div>
        <label htmlFor="Search">
        <span className="sr-only">Search</span>

        <div className="flex border-2 shadow-[4px_4px_0_0] focus-within:ring-2 focus-within:ring-yellow-300">
            <input onChange={(event) => {handleUserInputChange(event);handleEmptyInput()}} value={userInput} type={"text"} id="Search" className="text-center w-full border-none focus:ring-0 sm:text-sm" />
            <button onClick={() => {setbooksList([]);setUserInput("")}}>X</button>
            <button onClick={handleSearch} type={"button"} className="bg-yellow-300 px-4 py-2 text-xs/none font-bold tracking-wide uppercase hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-0">
                Search
            </button>
        </div>
    </label>
    {booksList.map((book: IBookCard) => 
        <SearchResultCard key={book.id} book={book} />
    )}
    </div>
    )
} */