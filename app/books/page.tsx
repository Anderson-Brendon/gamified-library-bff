import BookCard from "../components/ui/BookCard";
import { IBookCard } from "../type-definitions/Ibook";
import MyPagination from "../components/ui/paginationCreator";
import NavigationBar from "../components/common/navbar/NavBar";

//page:number = 0, itemsPerPage: number = 10

async function getBooks(page: number = 0){
  try {
    const response = await fetch(`http://localhost:8080/books?page=${page}`);

    const data  = await response.json();

    return data;
  } catch (error) {
   console.log(error);
  }

}

export default async function BooksList({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}){

  const params = await searchParams//promessa

  const booksInfo = await getBooks(params.page);

  const books: IBookCard[] = booksInfo.content;

   return (
   <main className="flex flex-col justify-between">
    <NavigationBar />
      <section className="flex flex-wrap justify-around sm:justify-center sm:m-12 mt-15">
         {books.map(book =>
          <BookCard key={book.id} book={book}/>
          )}
      </section>
      <nav className="flex justify-center mb-9 mt-9">
        <MyPagination totalPages={booksInfo.totalPages} currentPage={params.page || 0}/>
      </nav>
   </main>)
}//<PaginationCreator currentPage={params.page || 0} totalPages={booksInfo.totalPages} />