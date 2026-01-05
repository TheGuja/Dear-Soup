import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

interface Styles {
    className?: string;
}

export default function SaveButton({ className = ""}: Styles) {
    const [editor] = useLexicalComposerContext();

    const save = () => {
        const json = editor.getEditorState().toJSON()
        // TODO: send json data to supabase

        console.log(json)
    }

    return (
        <div>
            <button onClick={save} className={`inline-flex items-center px-3 py-1.5 rounded-md bg-stone-950 text-white hover:opacity-95 transition shadow-sm ${className}`}>
                Save
            </button>
        </div>
    );
}