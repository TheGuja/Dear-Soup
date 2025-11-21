'use client'

import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import SaveButton from './SaveButton';
// import { Save } from './actions';

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

// When the editor changes, you can get notified via the
// OnChangePlugin!
// function MyOnChangePlugin(props: { onChange: (editorState: EditorState) => void}): null {
//   // Access the editor through the LexicalComposerContext
//   const [editor] = useLexicalComposerContext();
//   const { onChange } = props;
//   // Wrap our listener in useEffect to handle the teardown and avoid stale references.
//   useEffect(() => {
//     // most listeners return a teardown function that can be called to clean them up.
//     return editor.registerUpdateListener(({editorState}) => {
//       // call onChange here to pass the latest state up to the parent.
//       onChange(editorState);
//     });
//   }, [editor, onChange]);
//   return null;
// }

// function GetEditorStateButton() {
//   const [editor] = useLexicalComposerContext();
// }

export default function CustomJournal() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

//   const [editorState, setEditorState] = useState();

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SaveButton className='bg-black text-white'/>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className='bg-black text-white'
            // aria-placeholder={'Enter some text...'}
            // placeholder={<div>Enter some text...</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={(editorState) => { console.log(editorState) }} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}