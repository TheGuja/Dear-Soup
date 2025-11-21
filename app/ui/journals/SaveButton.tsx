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
            <button onClick={save} className={className}>
                Save
            </button>
        </div>
    );
}