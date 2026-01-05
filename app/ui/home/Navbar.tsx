import Link from "next/link"

export default function Navbar() {
    return (
        <header className="w-full bg-black shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-white text-lg font-semibold">Dear Soup</h1>
                </div>
                <nav className="flex items-center gap-3">
                    <Link href={"/"} className="text-white px-3 py-1 rounded-md hover:bg-white/5 transition">Soup!</Link>
                    <Link href={"/home"} className="text-white px-3 py-1 rounded-md hover:bg-white/5 transition">More Soup!</Link>
                </nav>
            </div>
        </header>
    )
}