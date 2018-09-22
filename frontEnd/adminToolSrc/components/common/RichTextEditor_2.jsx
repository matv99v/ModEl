import React from 'react';

import Draft from 'draft-js';


const emptyContentState = Draft.convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});



export default class SimpleEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: Draft.EditorState.createWithContent(emptyContentState),
        };
        this.onChange = (editorState) => this.setState({editorState});
    }
    render() {
        const Editor = Draft.Editor;
        const editorState = this.state.editorState;
        return (
            <div style={{border: '1px solid black', padding: 10}}>
                <Editor
                    placeholder="Write something!"
                    editorKey="foobaz"
                    editorState={editorState}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
