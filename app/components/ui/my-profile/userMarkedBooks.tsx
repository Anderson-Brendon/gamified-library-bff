'use client'

import FavoriteBooks from "./favoriteBooks"
import UserReadingList from "./readingList"
import UserCompletedBooks from "./userCompletedBooks"

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
                <FavoriteBooks userId={id} />
            </div>
        </div>)
}