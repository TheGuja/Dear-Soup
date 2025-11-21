import { shareJournal } from "./actions";
import Tiptap from "../ui/journals/Tiptap";
import CustomJournal from "../ui/journals/CustomJournal";

export default function Page() {
    return (
        <>
            {/* <button>
                Create a journal
            </button> */}
            <form className="border-solid">
                <label htmlFor="journal-text">Journal Text:</label>
                <input id="journal-text" name="journal-text" type="text" />
                <label htmlFor="share">Share With:</label>
                <input id="share" name="share" type="email" />
                <button formAction={shareJournal}>Share Journal</button>
            </form>
            {/* <Tiptap /> */}
            <CustomJournal />
        </>

    );
}