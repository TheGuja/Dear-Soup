'use client'

import { saveJournal, savePage, loadPage, getTitle } from '@/utils/utils';
import { useState, useRef, useEffect } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function LoadContentPlugin({ content }: { content: string }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (content) {
            const editorState = editor.parseEditorState(content);
            editor.setEditorState(editorState);
        }
    }, [content, editor]);

    return null;
};

export default function Journal({ journalID }: { journalID: string}) {
    // function onError(error: Error): void {
    //     console.error(error);
    // }

    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

    const [text, setText] = useState<string>("");
    const sharedUserRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const [currentDisplayedContent, setCurrentDisplayedContent] = useState<string>(EMPTY_STATE);
    const [otherDisplayedContent, setOtherDisplayedContent] = useState<string>(EMPTY_STATE)
    const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
    const [displayedTitle, setDisplayedTitle] = useState<string>("Untitled Journal")

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPageContent: () => Promise<void> = async () => {
            const [currentUserContent, otherUserContent] = await loadPage(journalID, displayedDate);
            setCurrentDisplayedContent(currentUserContent);
            setOtherDisplayedContent(otherUserContent);
        };

        loadPageContent();
    }, [journalID, displayedDate]);

    useEffect(() => {
        const loadTitle: () => Promise<void> = async () => {
            const title = await getTitle(journalID);
            setDisplayedTitle(title);
            setIsLoading(false);
        };

        loadTitle();
    }, [journalID]);

    const handleSave: () => Promise<void> = async () => {
        const sharedUser = sharedUserRef.current?.value;
        const title = titleRef.current?.value;
        // const content = text;

        // Implement checking for empty values later
        if ( !sharedUser || !title) {
            alert("Please fill out shared user field!")
            return;
        }

        // console.log(data);
        await saveJournal(sharedUser, title, journalID);
    };

    const handlePageSave: () => Promise<void> = async () => {
        await savePage(journalID, displayedDate, text)
    }

    const initialConfigCurrentUser = {
        namespace: 'CurrentUser',
        editorState: EMPTY_STATE,
        onError: (error: Error) => console.error(error),
    };

    const initialConfigOtherUser = {
        namespace: 'OtherUser',
        editorState: EMPTY_STATE,
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

    if (isLoading) {
        return <div>Loading...</div>
    }
    // idea is to have one side dedicated to one user and the other side dedicated to the other user
    return (
    <>
        <div id='journal'>
        <div id='title'>
            <label htmlFor="share">Share With:</label>
            <input id="share" name="share" ref={sharedUserRef} type="email" />
            {/* <label htmlFor="title">Title:</label> */}
            {/* <input id="title" name="title" ref={titleRef} type="text" defaultValue={displayedTitle}/> */}
            {/* <button onClick={handleSave}>Share Journal</button> */}
        </div>
        <div className="h-screen flex flex-col items-center justify center">
            <div>
                <h1>{new Intl.DateTimeFormat('en-US', options).format(displayedDate)}</h1>
                <input id="title" name="title" ref={titleRef} type="text" defaultValue={displayedTitle}/>
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
                <LoadContentPlugin content={currentDisplayedContent}/>
                </LexicalComposer>

                {/* other user */}
                <LexicalComposer initialConfig={initialConfigOtherUser}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className='bg-stone-950 text-white h-[100%] w-[100%] p-[1%]'/>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* <OnChangePlugin onChange={(editorState: EditorState) => {setText(JSON.stringify(editorState.toJSON()))}}/> */}
                <HistoryPlugin />
                <AutoFocusPlugin />
                <TabIndentationPlugin />
                <LoadContentPlugin content={otherDisplayedContent}/>
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
                Save Journal
            </button>
            <button className='mt-[1%] bg-stone-950 text-white' onClick={handlePageSave}>
                Save Page Content
            </button>
            {/* <button className='mt-[1%] bg-stone-950 text-white' onClick={loadPageContent}>
                Load Page Content
            </button> */}
        </div>
        </div>
    </>
    );
};