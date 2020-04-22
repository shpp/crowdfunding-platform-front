import React, { Component } from 'react';

class Editor extends Component {
  state = {
    quill: null
  };

  componentDidMount() {
    // eslint-disable-next-line global-require
    this.setState({ quill: require('react-quill') });
  }

  render() {
    const { content, onChange } = this.props;
    const { quill: Quill } = this.state;
    if (Quill) {
      return (
        <Quill
          value={content}
          onChange={onChange}
          style={{ height: '200px' }}
        />
      );
    }
    return null;
  }
}

export default Editor;
