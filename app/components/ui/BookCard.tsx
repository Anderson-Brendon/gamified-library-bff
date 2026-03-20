import { IBookCard } from "@/app/type-definitions/book-interfaces";
import { Card } from "@mui/material";

export default function BookCard({ book }: { book: IBookCard }) {
    return (
            <Card className="flex flex-col justify-center">
                <h2 className="text-center">{book.title}</h2>
                <img loading={"lazy"} width={150} height={220} src={book.cover} />
            </Card>
    )
}

/**<Image unoptimized={true} width={150} height={220} src={book.cover} alt={book.title} /> */