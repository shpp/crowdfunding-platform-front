import ReactQuill from 'react-quill';
import { useState } from 'react';

const style = {
  height: '200px',
};
const Editor = ({ defaultContent }) => {
  const [content, setContent] = useState(defaultContent);
  return (
    <ReactQuill
      value={content}
      onChange={(value) => setContent(value)}
      style={style}
    />
  );
};

export default Editor;
