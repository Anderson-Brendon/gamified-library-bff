import { IBookCard } from "@/app/type-definitions/book-interfaces";
import { Card } from "@mui/material";

export default function BookCard({ book }: { book: IBookCard }) {
    return (
        <a className="mt-3 mb-3 sm:mr-4" href={`book/${book.slug}/${book.id}`}>
            <Card key={book.id} className="flex flex-col justify-center">
                <h2 className="text-center">{book.title}</h2>
                <img loading={"lazy"} width={150} height={220} src={book.cover} />
            </Card>
        </a>
    )
}

/**<Image unoptimized={true} width={150} height={220} src={book.cover} alt={book.title} /> */