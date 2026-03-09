"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface login {
  username: string,
  password: string
}

export async function tryLogin(formdata: FormData) {
  

  let redirectTo = "/login";

  const loginInfo: login = {
    username: formdata.get("username") as string,
    password: formdata.get("password") as string
  }

  const clientCookies = await cookies();

  try {
    const apiResponse = await fetch("http://localhost:8080/auth/login",
      {
        method: "POST",
        body: JSON.stringify( loginInfo ),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    const apiResponseBody = await apiResponse.json()

    console.log("Status:", apiResponse.status)         
    console.log("Body:", apiResponseBody)       

    if (apiResponse.ok) {

      clientCookies.set
        ("token", apiResponseBody.token,
          { maxAge: 60 * 60 * 24 * 7, path: "/", httpOnly: true })

     redirectTo = "/books";

    }
    

  } catch (error) {
    console.log(error)
  }

clientCookies.set
        ("loginFailed", "true",
          { maxAge: 1, path: "/", httpOnly: true })

  redirect(redirectTo);
}