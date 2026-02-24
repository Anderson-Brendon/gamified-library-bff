import Link from "next/link";

export default function Home() {
  return (<main className="flex items-center flex-col justify-evenly">
    <header className="text-center">
      <h1 className="text-xs">Gamified Library</h1>
    </header>
    <div className="flex flex-col sm:flex-row">
      <Link href={"./login"} className="mb-8 sm:mb-0 sm:mr-12 group inline-block rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 hover:text-white">
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          Login
        </span>
      </Link>
      <Link href={"./create-account"} className="mb-8 sm:mb-0 sm:mr-12 group inline-block rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 hover:text-white">
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          Create account
        </span>
      </Link>
      <Link href={"./books"} className="sm:mb-0 group inline-block rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 hover:text-white">
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          List of books
        </span>
      </Link>
    </div>
  </main>)
}
