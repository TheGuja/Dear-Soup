import { redirect } from "next/navigation"

export default function DSBanner() {
    return (
        <div className="bg-stone-950 w-full pt-[2%] flex justify-center">
            <button className="text-white text-8xl cursor-pointer" onClick={() => redirect('/')}>Dear Soup</button>
        </div>
    )
}