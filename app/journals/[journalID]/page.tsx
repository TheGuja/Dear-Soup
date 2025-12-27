import ShareDialogue from "@/app/ui/components/ShareDialogue";
import Journal from "@/app/ui/components/Journal";
import DSBanner from "@/app/ui/components/DSBanner";

export default async function Page({ params }: {params: Promise<{ journalID: string }>}) {
    const { journalID } = await params;

    return (
        <div className="min-h-screen">
            <DSBanner />
            <ShareDialogue journalID={journalID}/>
            <Journal journalID={journalID}/>
        </div>
    );
}

