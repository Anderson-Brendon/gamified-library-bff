'use client'

import FavoriteBooks from "../../common/user-books/userFavoriteBooks"
import UserReadingList from "../../common/user-books/readingList"
import UserCompletedBooks from "../../common/user-books/userCompletedBooks"
import UserFavoriteBooks from "../../common/user-books/userFavoriteBooks"

export default function UserMarkedBooks({ id }: { id: number }) {
    return (
        <div className="flex flex-col mt-4">
            <div className="mb-4">
                <UserReadingList userId={id} />
            </div>
            <div className="mb-4">
                <UserCompletedBooks userId={id} />
            </div>
            <div className="mb-4">
                <UserFavoriteBooks userId={id} />
            </div>
        </div>)
}