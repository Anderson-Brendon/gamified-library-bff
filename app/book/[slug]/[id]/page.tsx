import NavigationBar from "@/app/components/common/navbar/NavBar";
import { Reviews } from "@/app/components/ui/review/reviews";
import IBook from "@/app/type-definitions/book-interfaces";
import Rating from "@mui/material/Rating";

async function fetchBook(id: number): Promise<IBook> {
    try {
        const response: Response = await fetch(`http://192.168.1.11:8080/books/${id}`);
        const book: IBook = await response.json();
        return book;
    } catch (e) {
        console.log(e);
        throw e;
    }

}

export default async function BookInfo({ params }: { params: { id: number } }) {

    const { id } = await params;

    const book: IBook = await fetchBook(id);

    return (
        <main>
            <header className="mb-4">
                <NavigationBar />
                <span className="flex items-center">
                    <span className="h-px flex-1 bg-gray-300"></span>

                    <h1 className="shrink-0 px-4 text-gray-900">{book.title}</h1>

                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
            </header>
            <section id="book-info" className="flex flex-col justify-center">
                <div className="flex flex-col items-center ">
                    <Rating size={"large"} value={book.averageRating} precision={0.1} readOnly />
                    <p>{book.averageRating === 0 ? "No ratings yet" : book.averageRating.toFixed(2)}</p>
                </div>
                <img src={book.cover} className="self-center" />
                <div className={"mb-4 mt-8"}>
                    <details className="group border-2 border-black shadow-[4px_4px_0_0] [&amp;_summary::-webkit-details-marker]:hidden" open={false}>
                        <summary className="flex cursor-pointer items-center justify-between gap-4 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-0">
                            <span className="font-semibold">Description</span>

                            <svg className="size-5 shrink-0 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </summary>

                        <div className="border-t-2 border-black p-4">
                            <p>
                                {book.description}
                            </p>
                        </div>
                    </details>
                </div>
                <ul>
                    <li>Year of release: {book.releaseYear}</li>
                    <li>Author: {book.author.name}</li>
                    <li>Genre: {book.genre.name}</li>
                </ul>
            </section>
            <Reviews bookId={id} />
        </main>)
}