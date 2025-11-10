import { shareJournal } from "./actions";

export default function Page() {
    return (
        <>
            {/* <button>
                Create a journal
            </button> */}
            <form>
                <label htmlFor="journal-text">Journal Text:</label>
                <input id="journal-text" name="journal-text" type="text" />
                <label htmlFor="share">Share With:</label>
                <input id="share" name="share" type="email" />
                <button formAction={shareJournal}>Share Journal</button>
            </form>
        </>

    );
}