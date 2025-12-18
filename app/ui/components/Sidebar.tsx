export default function Sidebar( {open, onClose }: {open: boolean; onClose: () => void}) {
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
                <ul className="mt-[10%] ml-[10%]">
                    <li>
                        Dear Soup
                    </li>
                    <li className="mt-[10%]">
                        More Soup
                    </li>
                </ul>
            </aside>
        </>
    );
}