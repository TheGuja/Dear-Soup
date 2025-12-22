'use client'

import { shareJournal } from '@/app/create/actions';
import { saveJournal } from '@/utils/utils';
import { useState, useRef } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

export default function Journal({ savedCurrentUserData, savedOtherUserData, journalID }: { savedCurrentUserData?: string, savedOtherUserData?: string, journalID: string}) {
    // function onError(error: Error): void {
    //     console.error(error);
    // }
    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

    const [text, setText] = useState<string>("");
    const sharedUserRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const [displayedDate, setDisplayedDate] = useState<Date>(new Date())

    const handleSave: () => Promise<void> = async () => {
        const sharedUser = sharedUserRef.current?.value;
        const title = titleRef.current?.value;
        const content = text;

        // Implement checking for empty values later
        if ( !sharedUser || !title) {
            alert("Please fill out shared user field!")
            return;
        }

        // console.log(data);
        await saveJournal(sharedUser, title, journalID);
    };

    const initialConfigCurrentUser = {
        namespace: 'MyEditor',
        editorState: savedCurrentUserData || EMPTY_STATE,
        onError: (error: Error) => console.error(error),
    };

    const initialConfigOtherUser = {
        namespace: 'MyEditor',
        editorState: savedOtherUserData || EMPTY_STATE,
        onError: (error: Error) => console.error(error),
    };

    // Check to see if it gets current date for current timezone
    // const todayDate = new Date();
    // const displayedDate = new Date(todayDate);
    // todayDate.setDate(todayDate.getDate() + 10)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(displayedDate);


    // idea is to have one side dedicated to one user and the other side dedicated to the other user
    return (
    <>
        <div id='journal'>
        <div id='title'>
            <label htmlFor="share">Share With:</label>
            <input id="share" name="share" ref={sharedUserRef} type="email" />
            <label htmlFor="title">Title:</label>
            <input id="title" name="title" ref={titleRef} type="text" />
            {/* <button onClick={handleSave}>Share Journal</button> */}
        </div>
        <div className="h-screen flex flex-col items-center justify center">
            <div>
                <h1>{new Intl.DateTimeFormat('en-US', options).format(displayedDate)}</h1>
            </div>
            <div className='flex space-x-4 h-[70%] w-[80%] mt-[2%]'>
                <button onClick={() => {
                    setDisplayedDate(prevDate => {
                        const nextDate = new Date(prevDate); // Clone the previous date
                        nextDate.setDate(prevDate.getDate() - 1); // Mutate the clone, not the state
                        return nextDate; // Return the new object
                    });
                }}>
                    <h1>Previous Page</h1>
                </button>
                <LexicalComposer initialConfig={initialConfigCurrentUser}>
                <RichTextPlugin
                    contentEditable={
                    // <ContentEditable className='bg-stone-950 text-white h-[100%] w-[100%] p-[1%] bg-[repeating-linear-gradient(white,_white_12px,_black_12px,_black 24px)]'/>
                    <ContentEditable className='bg-stone-950 text-white h-[100%] w-[100%] p-[1%]' />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* <EditorRefPlugin editorRef={editorRef}/> */}
                <OnChangePlugin onChange={(editorState: EditorState) => {setText(JSON.stringify(editorState.toJSON()))}} />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <TabIndentationPlugin />
                </LexicalComposer>

                {/* other user */}
                <LexicalComposer initialConfig={initialConfigOtherUser}>
                <RichTextPlugin
                    contentEditable={
                    // <ContentEditable className='bg-black text-white w-[100%] h-[100%]'/>
                    <ContentEditable className='bg-stone-950 text-white h-[100%] w-[100%] p-[1%]'/>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* <OnChangePlugin onChange={(editorState: EditorState) => {setText(JSON.stringify(editorState.toJSON()))}}/> */}
                <HistoryPlugin />
                <AutoFocusPlugin />
                <TabIndentationPlugin />
                </LexicalComposer>
                <button onClick={() => {
                    setDisplayedDate(prevDate => {
                        const nextDate = new Date(prevDate); // Clone the previous date
                        nextDate.setDate(prevDate.getDate() + 1); // Mutate the clone, not the state
                        return nextDate; // Return the new object
                    });
                }}>
                    <h1>Next Page</h1>
                </button>
            </div>
            <button className='mt-[1%] bg-stone-950 text-white' onClick={handleSave}>
                Save
            </button>
        </div>
        </div>
    </>
    );
};