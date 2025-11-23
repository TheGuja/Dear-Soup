'use client'

import { shareJournal } from "./actions";
import CustomJournal from "../ui/journals/CustomJournal";
import SaveButton from "../ui/journals/SaveButton";

export default function Page() {
    return (
        // <div className="flex justify-center items-center h-[80vh] w-[70vh] bg-black">
        //     <button>
        //         Create a journal
        //     </button>
        //     <form className="border-solid">
        //         <label htmlFor="journal-text">Journal Text:</label>
        //         <input id="journal-text" name="journal-text" type="text" />
        //         <label htmlFor="share">Share With:</label>
        //         <input id="share" name="share" type="email" />
        //         <button formAction={shareJournal}>Share Journal</button>
        //     </form>
        //     <CustomJournal />
        // </div>
        <div className="h-screen flex items-center justify-center">
            <CustomJournal className="bg-stone-950 border border-white text-white h-[50%] w-[35%] p-[1%]"/>
            <CustomJournal className="bg-stone-950 border border-white text-white h-[50%] w-[35%] p-[1%]"/>
            {/* <SaveButton /> */}
        </div>


    );
}