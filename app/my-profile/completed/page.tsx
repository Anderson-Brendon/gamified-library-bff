import NavigationBar from "@/app/components/common/navbar/NavBar";
import UserCompletedBooks from "@/app/components/common/user-books/userCompletedBooks";
import { headers } from "next/headers";

export default async function CompletedBooks() {

    const clientHeaders = await headers();
    
    const userId = parseInt(clientHeaders.get("x-user-id")!);
    
    return (
        <main className="flex flex-col justify-between">
            <NavigationBar />
            <header className="text-center">
                <h1>{userId ? "My completed books" : "Completed books"}</h1>
            </header>
            <UserCompletedBooks userId={userId} />
        </main>
    )
}