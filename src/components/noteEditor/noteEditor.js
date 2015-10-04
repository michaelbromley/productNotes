import React from 'react';
import marked from 'marked';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false
        };
    }

    componentDidMount() {
        let textarea = this.refs.input.getDOMNode();
        textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px;overflow-y:hidden;');
    }

    focus = () => {
        this.setState({
            focus: true
        });
    };

    change = (event) => {
        let note = this.props.note;
        note.content = event.target.value;
        this.props.onChange(note);
        this.autoSize(event.target);
    };

    blur = (event) => {
        this.setState({
            focus: false
        });
        this.props.onBlur(this.props.note);
    };

    parseMarkdown(md) {
        return {
            __html: marked(md || '')
        };
    }

    keyHandler = (event) => {
        let keyCode = event.keyCode || event.which,
            textarea = event.target;

        if (keyCode == 9) {
            event.preventDefault();
            let start = textarea.selectionStart,
                end = textarea.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

            // put caret at right position again
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    };

    autoSize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    render() {
        var outerClass = 'note-editor ' + (this.state.focus ? 'focus' : ''),
            inputClass = 'input ' + this.props.element,
            previewHtml = this.parseMarkdown(this.props.note.content);
        return (
            <div className={outerClass} tabIndex="0" onClick={this.focus} onFocus={this.focus}>
                <textarea value={this.props.note.content} className="input"
                          ref="input"
                          onChange={this.change}
                          onBlur={this.blur}
                          onKeyDown={this.keyHandler}></textarea>
                <div className="preview" dangerouslySetInnerHTML={previewHtml}></div>
            </div>
        );
    }
}

export default NoteEditor;