import React, { Component } from 'react';

const style = {
  height: '200px',
};
class Editor extends Component {
  quill = null;

  componentDidMount() {
    // eslint-disable-next-line global-require
    this.quill = require('react-quill');
  }

  render() {
    const { content, onChange } = this.props;
    const Quill = this.quill;
    if (Quill) {
      return (
        <Quill
          value={content}
          onChange={(e) => onChange(e)}
          style={style}
        />
      );
    }
    return null;
  }
}

export default Editor;
