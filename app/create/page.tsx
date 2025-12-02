// export default function Page() {
//     return (
import { shareJournal } from "./actions";


export default function Page() {
    return (
        <div>
            <button className="border border-black">
                Create a journal
            </button>
            <form className="border border-solid">
                <label htmlFor="journal-text">Journal Text:</label>
                <input id="journal-text" name="journal-text" type="text" />
                <label htmlFor="share">Share With:</label>
                <input id="share" name="share" type="email" />
                <label htmlFor="title">Title:</label>
                <input id="title" name="title" type="text" />
                <button formAction={shareJournal}>Share Journal</button>
            </form>
        </div>
    );
}