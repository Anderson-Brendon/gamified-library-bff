import SearchInput from "./searchInput";

export default function NavigationBar() {
    return (
        <nav className="flex justify-around items-center flex-wrap pt-6">
            <div className="mb-4 sm:mb">
                <SearchInput />
            </div>
                <a className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0" href="/books">
                    <span className="relative z-10"> Books </span>
                </a>
                <a className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0" href="/profile">
                    <span className="relative z-10"> Profile</span>
                </a>
                <a className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0" href="/ranking">
                    <span className="relative z-10"> Ranking </span>
                </a>
                <a className="relative border-black bg-white px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0" href="/Logout">
                    <span className="relative z-10"> Logout </span>
                </a>
        </nav>)
}

//className="hidden flex flex-col sm:flex-row"