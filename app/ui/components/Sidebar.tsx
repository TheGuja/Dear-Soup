import Link from "next/link";

type NavLink = {
    name: string;
    href: string;
}

export default function Sidebar( {open, onClose }: {open: boolean; onClose: () => void}) {
    const navLinks: NavLink[] = [
        { name: 'Home', href: '/'},
        { name: 'Journals', href: '/journals'},
        { name: 'Create', href: '/create'},
    ];

    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/50 transition-opacity
                ${open ? 'opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}
            />
            <aside
                className={`fixed top-0 left-0 h-screen w-[25%] bg-stone-900 text-white transform transition-transform
                ${open ? "translate-x-0" : "-translate-x-full"}`}
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