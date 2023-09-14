import React, { Component } from 'react';
import api from '../api';
import colors from '../theme/colors';

const styles = {
  wrapper: {
    textAlign: 'center',
    margin: '20px 0',
  },
  button: {
    backgroundColor: colors.green,
    color: colors.white,
    border: 'none',
    padding: '10px 15px',
    fontSize: '14px',
    width: '100%',
    maxWidth: '275px',
    display: 'inline-block',
    cursor: 'pointer',
  },
  form: {
    display: 'none'
  }
};

export default class ButtonDonate extends Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.state = {
      button: ''
    };
  }

  async componentDidMount() {
    const { projectId } = this.props;
    const { button } = await api.get('button', { id: projectId });
    this.setState({
      button: button.replace(/\\/g, ''),
    });
  }

  onSubmitClick() {
    const form = this.submitRef.current.getElementsByTagName('form')[0];
    if (form) {
      form.setAttribute('target', '_blank');
      form.submit();
    }
  }

  render() {
    return (
      <div style={styles.wrapper} ref={this.submitRef}>
        <button
          style={styles.button}
          type="button"
          onClick={() => this.onSubmitClick()}
          onKeyPress={() => {}}
        >
          Підтримати
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.button }}
          style={styles.form}
        />
      </div>
    );
  }
}
