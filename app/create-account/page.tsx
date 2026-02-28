'use client';

import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface userCreationDTO {
  email: string | null,
  username: string | null,
  password: string | null
}

export default function CreateAccount() {

  const [creationStatus, setCreationStatus] = useState(null);

  async function postAccountInfo(formdata: FormData) {

    console.log((await fetch("http://localhost:8080/users")).json);

    const user: userCreationDTO = {
      email: formdata.get("email") as string,
      username: formdata.get("username") as string,
      password: formdata.get("password") as string,
    };

    try {
      const resp: Response = await fetch("http://localhost:8080/users",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        })

      const apiMessage = await resp.json();

      console.log(apiMessage);
      if (resp.ok) {
        setCreationStatus(apiMessage.success);
      } else {
        setCreationStatus(apiMessage.exception)
      }
    } catch (error) {
      console.log(error, "erro")
    }
  }

  return (
    <main className="min-h-screen flex items-center flex-col justify-center">
      <h1 className="text-center mb-9 text-4xl">Account creation</h1>
      <div>
       <p className="mb-4">{creationStatus ?? ""}</p>
      </div>
      <form action={postAccountInfo} className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-900" htmlFor="email">Email</label>
          <input name={"email"}  required className="text-center border-solid border-3 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id={"email"} type={"email"} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900" htmlFor="username">Username</label>
          <input name={"username"} minLength={6} maxLength={16} required  className="text-center border-solid border-3 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id={"username"} type={"text"} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900" htmlFor="password">Password</label>
          <input name={"password"} minLength={6} maxLength={30} required  className="text-center border-solid border-3 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id={"password"} type={"text"}/>
        </div>
        <button className="block w-full rounded-lg bg-green-600 px-12 py-3 text-md font-medium text-black transition-colors hover:bg-green-500" type="submit">
          Send
        </button>
      </form>
    </main>)
}
