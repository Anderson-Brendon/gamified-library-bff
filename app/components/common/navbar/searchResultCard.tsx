'use client';

import { IBookCard } from "@/app/type-definitions/Ibook";

export default function SearchResultCard({ book }: { book: IBookCard }) {
    return (
        <a className="w-32 mr-0 sm:mr-4" href={`/book/${book.id}/${book.slug}`}>
            <p className="text-center">{book.title}</p>
            <img src={book.cover} />
        </a>
    )
}