import ReactQuill from 'react-quill';
import { useState } from 'react';

const Editor = ({ defaultContent }) => {
  const [content, setContent] = useState(defaultContent);   // set default height of editor
    return (
      <ReactQuill
        value={content}
        onChange={value => setContent(value)}
      />
    )
};

export default Editor;
