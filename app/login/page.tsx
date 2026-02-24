'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

interface login {
  username: string,
  password: string
}

export default function Login() {

  const [loginResult, setLoginResult] = useState(null);

  const router = useRouter();

  async function tryLogin(formdata: FormData) {

    const user: login = {
      username: formdata.get("username") as string,
      password: formdata.get("password") as string
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const responseBody = await response.json()
      if (response.ok) {
        await cookieStore.set("token", responseBody.token)
        const cookieValue = await cookieStore.get("token")
        console.log(cookieValue?.value)
        router.push("/books")
      }else{
        setLoginResult(responseBody.exception)
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className="flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-3xl">Login</h1>
        <p>{loginResult ?? ""}</p>
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
