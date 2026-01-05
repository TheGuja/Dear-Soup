'use client'

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/login/actions";

export default function Sidebar() {
    const navLinks: NavLink[] = [
        { name: 'Home', href: '/'},
        { name: 'Journals', href: '/journals'},
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-50 px-3 py-2 bg-white text-black rounded-md hover:bg-stone-200 shadow-sm">
                        ≡
                    </button>
                )
            }
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 transition-opacity z-40
                ${isOpen ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}
            />
            <aside
                className={`fixed top-0 left-0 h-screen w-72 max-w-xs bg-stone-900 text-white transform transition-transform z-50 px-6 py-6
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <nav>
                    <ul className="flex flex-col h-screen">
                        {navLinks.map((link: NavLink) => (
                            <li key={link.href} className="mb-2">
                                <Link href={link.href} className="text-lg px-3 py-2 rounded-md hover:bg-white/5 transition">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        
                        <li className="mt-auto mb-6"> 
                            <button 
                                className="text-lg px-3 py-2 rounded-md hover:bg-white/5 transition" 
                                onClick={async () => {await logout()}}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}