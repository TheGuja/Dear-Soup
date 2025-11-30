import Link from "next/link"

export default function Navbar() {
    return (
        <div className="flex flex-row bg-black w-full h-1/10 text-5xl">
            <div className="border-4 border-sky-500 m-[1%]">
                <h1 className="text-white">
                    Dear Soup
                </h1>
            </div>
            <Link href={"/"} className="border-4 border-indigo-500 m-[1%] text-white">
                <div>
                    Soup!
                </div>
            </Link>
            <Link href={"/home"} className="border-4 border-sky-500 text-white m-[1%]">
                <div>
                    More Soup!
                </div>
            </Link>
        </div>
    )
}