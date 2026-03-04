import { userLeaderboard } from "../type-definitions/leaderboard";
import NavigationBar from "../components/common/navbar/NavBar";

async function fetchUsersLeaderboard(){
    try{
       const response: Response = await fetch("http://localhost:8080/leaderboard?size=25");
       const users = await response.json()
       return users;
    }catch(error){
        console.log(error)
    }
}


export default async function Leaderboard() {

    const users: userLeaderboard[] = await fetchUsersLeaderboard();

    return (
        
        <main>
            <NavigationBar />
            <header className="mb-4">
                <h1 className={"text-center"}>Top 25 users with the highest quiz score</h1>
            </header>
            <div className={"flex flex-wrap justify-center items-around"}>
                {users.map(user => 
                <section className="flex flex-col items-center mr-4 mb-4" key={user.userId}>
                    <p>{`Name: ${user.username}`}</p>
                    <img width={260} height={260} src={user.profilePic} className=""/>
                    <p>{`Total points: ${user.totalPoints}`}</p>
                    <p>{`Random answers: ${user.randomAnswers}`}</p>
                </section>)}
            </div>
        </main>)
}