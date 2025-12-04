'use client'

import { useState } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

function onError(error: Error): void {
  console.error(error);
}

export default function Page() {
  const [text, setText] = useState<string | null>(null);

  const initialConfig = {
    namespace: 'MyEditor',
    onError
  };

  // idea is to have one side dedicated to one user and the other side dedicated to the other user
  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center' id='journal'>
        <div id='title'>
          <input placeholder='Title' className='border border-bg-stone-950'/>
        </div>
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
            <OnChangePlugin onChange={(editorState: EditorState) => {setText(JSON.stringify(editorState.toJSON()))}}/>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <TabIndentationPlugin />
            </LexicalComposer>
        </div>

        {/* Define function to save json text to database */}
        <button className='mt-[1%] bg-stone-950 text-white' onClick={() => console.log(text)}>
            Save
        </button>
      </div>
    </>
  );
}