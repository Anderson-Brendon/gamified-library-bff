import NavigationBar from "@/app/components/common/navbar/NavBar";
import UserFavoriteBooks from "@/app/components/common/user-books/userFavoriteBooks";
import UserReadingList from "@/app/components/common/user-books/userReadingList";
import { headers } from "next/headers";

export default async function MyReadingList() {

    const clientHeaders = await headers();
    
    const userId = parseInt(clientHeaders.get("x-user-id")!);

    return (
        <main className="flex flex-col justify-between">
            <NavigationBar />
            <header className="text-center">
                <h1>My Reading List</h1>
            </header>
            <UserReadingList isOwner={true} userId={userId}/>
        </main>
    )
}