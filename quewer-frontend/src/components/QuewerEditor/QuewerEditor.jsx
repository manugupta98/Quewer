import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QuewerEditor.css';

class QuewerEditor extends React.Component {
    state = { contentState: null }
    onChange = (contentState) => this.setState({ contentState });

    render() {
        return (
            <Editor 
                initialContentState={this.state.contentState}
                wrapperClassName="Wrapper"
                editorClassName="Editor"
                onContentStateChange={this.onChange}
                toolbarClassName="Toolbar"
            />
        );
    }
}

export default QuewerEditor;