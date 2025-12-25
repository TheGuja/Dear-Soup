'use client'

import Link from "next/link";
import { useState } from "react";

type NavLink = {
    name: string;
    href: string;
}

export default function Sidebar() {
    const navLinks: NavLink[] = [
        { name: 'Home', href: '/'},
        { name: 'Journals', href: '/journals'},
        { name: 'Create', href: '/create'},
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-50 px-4 py-2 bg-white text-black rounded hover:bg-stone-200">
                        ≡
                    </button>
                )
            }
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 transition-opacity
                ${isOpen ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}
            />
            <aside
                className={`fixed top-0 left-0 h-screen w-[25%] bg-stone-900 text-white transform transition-transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <nav className="">
                    <ul>
                        {navLinks.map((link: NavLink) => (
                            <li key={link.href} className="m-[5%]">
                                <Link href={link.href} className="text-xl hover:text-stone-400">{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}