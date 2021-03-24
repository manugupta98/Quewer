import React from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QuewerEditor.css';

class QuewerEditor extends React.Component {
    state = { editorState: EditorState.createEmpty() }
    onChange = (editorState) => this.setState({editorState})

    render() {
        return (
            <Editor 
                editorState={this.state.editorState}
                wrapperClassName="Wrapper"
                editorClassName="Editor"
                onEditorStateChange={this.onChange}
                toolbar={{
                    options: ['inline', 'fontSize']
                }}
                toolbarClassName="Toolbar"
            />
        );
    }
}

export default QuewerEditor;