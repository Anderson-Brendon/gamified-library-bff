import { headers } from "next/headers";
import { UserInfo } from "../type-definitions/user";
import NavigationBar from "../components/common/navbar/NavBar";
import { ProfilePictureUploader } from "./profilePictureUploader";

async function fetchUserById(id: number) {
    try {
        const response: Response = await fetch(`http://localhost:8080/users/${id}`);

        const user = await response.json();

        return user;

    } catch (error) {
        throw error;
    }
}
//maybe add jwt verify later
export default async function MyProfile() {

    const clientHeaders = await headers();

    const userId = parseInt(clientHeaders.get("x-user-id")!);

    const user: UserInfo = await fetchUserById(userId);

    //console.log("user", user)

    return (
        <main className={"flex flex-col"}>
            <NavigationBar />
            <header className={"text-center"}>
                <h1>My profile</h1>
            </header>
            <div className={"flex grow flex-col items-center justify-evenly sm:justify-around sm:flex-row sm:items-baseline"}>
                <div>
                    <ProfilePictureUploader profilePictureUrl={user.profilePic}/>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Total quiz score: </p>
                    <p>Answered quizzes: </p>
                </div>
                <a className={"mb-4 border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0"}>
                    Reading List
                </a>
                <a href={`/my-profile/favorites`} className={"mb-4 border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0"}>
                    Favorites
                </a>
                <a className={"mb-4 border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0"}>
                    Completed
                </a>
            </div>
        </main>)
}//posso reaproveitar aquela listagem dos livros e deixar em comum melhor do que a bagunça usando só react client

//needs to extract jwt claim id using a library and then fetch it from the api