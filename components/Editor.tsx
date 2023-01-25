import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction, useState } from 'react'
import { EditorProps } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    {
        ssr:false,
    }
)

export default function CustomEditor(
        {   editorState, 
            readOnly=false,
            onSave,
            onEditorStateChange
        }:
        {
            editorState:EditorState,
            readOnly:boolean
            onSave?:() => void,
            onEditorStateChange?:Dispatch<SetStateAction<EditorState | undefined>>
        }
    ){

    return (
        <div style={{padding:'16px'}}>
            <Editor
                readOnly={readOnly}
                editorState={editorState}
                toolbarHidden={readOnly}
                toolbarClassName="wrapper-class"
                wrapperClassName="editorToolbar-hidden"
                editorClassName="editor-class"
                toolbar={{
                    options:['inline', 'list', 'textAlign', 'link']
                }}
                localization={{
                    locale:'ko',
                }}
                onEditorStateChange={onEditorStateChange}
            />;
            {
                !readOnly && <button onClick={onSave}>Save</button>
            }
        </div>
    )
}
