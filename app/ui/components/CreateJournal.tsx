'use client'

export default function CreateJournal({ onClick }: { onClick: () => Promise<void> }) {
    return (
        <button onClick={onClick}>
            Create New Journal
        </button>
    )
}