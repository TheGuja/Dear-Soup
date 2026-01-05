'use client'

import { redirect } from "next/navigation"

export default function DSBanner() {
    return (
        <div className="bg-stone-950 w-full py-6 flex justify-center">
            <button className="text-white text-3xl md:text-4xl font-semibold cursor-pointer hover:opacity-95 transition" onClick={() => redirect('/')}>Dear Soup</button>
        </div>
    )
}