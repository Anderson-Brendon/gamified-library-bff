import { cookies } from "next/headers";
import { tryLogin } from "./action";


export default async function Login() {

  const clientCookies = await cookies();

  /*if (clientCookies.has("token")) {
    redirect("/books") ;
  }*/

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-3xl">Login</h1>
        <p>{clientCookies.has("loginFailed") ? "Login attempt failed, try again" : ""}</p>
      </header>
      <form action={tryLogin} className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-900" htmlFor="username">Username</label>
          <input name={"username"} minLength={6} maxLength={16} required={true} className="border-solid border-3 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id={"username"} type={"text"} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900" htmlFor="password">Password</label>
          <input name={"password"} minLength={6} maxLength={30} required={true} className="border-solid border-3 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id={"password"} type={"text"} />
        </div>
        <button className="block w-full rounded-lg bg-green-600 px-12 py-3 text-md font-medium text-black transition-colors hover:bg-green-500" type="submit">
          Send
        </button>
      </form>
    </main>)
}