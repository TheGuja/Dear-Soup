import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function Save() {
    const [editor] = useLexicalComposerContext();

    const json = editor.getEditorState().toJSON()
    // Send json data to supabase
    console.log(json)
}