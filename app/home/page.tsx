import SideNav from "../ui/home/sidenav";
import { getJournalEntries } from "./actions";
import { getCurrentUser } from "@/utils/utils";

export default function Page() {
    getJournalEntries();
    
    return (
        <div>
            <h1>Dear Soup Home Page</h1>
            <SideNav/>
        </div>
    )
}