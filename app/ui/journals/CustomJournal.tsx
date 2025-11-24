'use client'

import {$getRoot, $getSelection} from 'lexical';
import {useRef} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { LexicalEditor } from 'lexical';

import SaveButton from './SaveButton';
// import { Save } from './actions';

interface Styles {
    className?: string;
}

interface Save {

}

const theme = {
  // Theme styling goes here
  //...
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error): void {
  console.error(error);
}

export default function CustomJournal({ className = "" } : Styles) {
  const editorRef = useRef(null)

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          // <ContentEditable className='bg-black text-white w-[100%] h-[100%]'/>
          <ContentEditable className={className}/>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <EditorRefPlugin editorRef={editorRef}/>
      <HistoryPlugin />
      <AutoFocusPlugin />
      <TabIndentationPlugin />
    </LexicalComposer>
  );
}