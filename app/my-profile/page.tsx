import { headers } from "next/headers";
import { UserInfo } from "../type-definitions/user";

async function fetchUserById(id: number){
    try{
        const response: Response = await fetch(`http://localhost:8080/users/${id}`);

        const user = await response.json();

        return user;

    }catch(error){
        throw error;
    }
}
//maybe add jwt verify later
export default async function MyProfile(){

    const clientHeaders = await headers();
    
    const userId = parseInt(clientHeaders.get("x-user-id")!);

    const user: UserInfo = await fetchUserById(userId);

    console.log("user", user)
   
    return (
    <main>
        <header>
            <h1>My profile</h1>
        </header>
        <img className={"w-50"} src={user.profilePic} />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
    </main>)
}

//needs to extract jwt claim id using a library and then fetch it from the api