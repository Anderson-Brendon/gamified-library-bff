import NavigationBar from "@/app/components/common/navbar/NavBar";
import UserFavoriteBooks from "@/app/components/common/user-books/userFavoriteBooks";
import { headers } from "next/headers";

export default async function MyFavorites() {

    const clientHeaders = await headers();
    
    const userId = parseInt(clientHeaders.get("x-user-id")!);

    return (
        <main className="flex flex-col justify-between">
            <NavigationBar />
            <header className="text-center">
                <h1>My favorite books</h1>
            </header>
            <UserFavoriteBooks isOwner={true} userId={userId}/>
        </main>
    )
}