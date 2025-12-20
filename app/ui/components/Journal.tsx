'use client'

import { shareJournal } from '@/app/create/actions';
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

export default function Journal({ savedData }: { savedData?: string}) {
    // function onError(error: Error): void {
    //     console.error(error);
    // }
    const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

    const [text, setText] = useState<string>("");
    const sharedUserRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const handleShare = async () => {
    const sharedUser = sharedUserRef.current?.value;
    const title = titleRef.current?.value;
    const content = text;

    // Implement checking for empty values later
    if ( !sharedUser || !title) {
        alert("Please fill out shared user field!")
        return;
    }

    // console.log(data);
    await shareJournal(sharedUser, title, content);
    };

    const initialConfig = {
    namespace: 'MyEditor',
    editorState: savedData || EMPTY_STATE,
    onError: (error: Error) => console.error(error),
    };

    // idea is to have one side dedicated to one user and the other side dedicated to the other user
    return (
    <>
        <div id='journal'>
        <div id='title'>
            <label htmlFor="share">Share With:</label>
            <input id="share" name="share" ref={sharedUserRef} type="email" />
            <label htmlFor="title">Title:</label>
            <input id="title" name="title" ref={titleRef} type="text" />
            <button onClick={handleShare}>Share Journal</button>
        </div>
        <div className="h-screen flex flex-col items-center justify center">
            <div className='flex space-x-4 h-[70%] w-[80%] mt-[2%]'>
                <LexicalComposer initialConfig={initialConfig}>
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
                <LexicalComposer initialConfig={initialConfig}>
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
            </div>
            <button className='mt-[1%] bg-stone-950 text-white' onClick={() => console.log(text)}>
                Save
            </button>
        </div>
        </div>
    </>
    );
};