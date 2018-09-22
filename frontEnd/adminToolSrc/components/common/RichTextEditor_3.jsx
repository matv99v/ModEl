import React from 'react';

import Draft from 'draft-js';


const {
    CompositeDecorator,
    ContentState,
    Editor,
    EditorState,
    convertFromHTML,
    convertToRaw,
} = Draft;

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
};

const Image = (props) => {
    const {
        height,
        src,
        width,
    } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <img src={src} height={height} width={width} />
    );
};

function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}



export default class HTMLConvertExample extends React.Component {
    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
            {
                strategy: findImageEntities,
                component: Image,
            },
        ]);
        const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
      '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
      '<img src="https://img-egc.xnxx-cdn.com/videos/thumbslll/6a/cf/ef/6acfeff9edbb1247a57de829bd41e68e/6acfeff9edbb1247a57de829bd41e68e.16.jpg" height="112" width="200" />';
        const blocksFromHTML = convertFromHTML(sampleMarkup);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        this.state = {
            editorState: EditorState.createWithContent(
                state,
                decorator,
            ),
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
    }
    render() {
        return (
            <div style={styles.root}>
                <div style={{marginBottom: 10}}>
          Sample HTML converted into Draft content state
                </div>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
}
