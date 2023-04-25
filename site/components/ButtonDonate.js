import React, { Component } from 'react';
import { toast } from 'react-toastify';

import api from '../api';
import { colors, p } from '../utils/theme';
import { i18n, withTranslation } from '../utils/translations';

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

class ButtonDonate extends Component {
  state = {
    modalVisible: false,
    phoneIsValid: true,
    phone: ''
  };

  componentDidMount() {
    // this hook was called twice
    // because props had two values
    // the prop is i18n and this is the hack to check if it is in final state already
    if (i18n.language) {
      // eslint-disable-next-line camelcase
      const { project_id } = this.props;
      // eslint-disable-next-line no-undef
      LiqPayCheckout.on('liqpay.callback', async (d) => {
        let processableCallback = true;

        // hack for several same requests
        try {
          processableCallback = localStorage.getItem('lastRequestedProjectId') === project_id + ''
            && localStorage.getItem('lastHandledOrderId') !== d.order_id;
        } catch (e) {
          //
        }

        if (processableCallback && ['success'].includes(d.status)) {
          try {
            localStorage.setItem('lastHandledOrderId', d.order_id);
          } catch (e) {
            //
          }
          await api.post('project-2', {
            ...d,
            project_id,
            UAH_amount: d.amount_debit,
            status: d.status,
            _notify: false
          });
          const Toast = () => (
            <div>
              <p>{this.props.t('notification.success.general')}</p>
            </div>
          );
          toast(Toast, {
            autoClose: false,
            position: 'top-center',
            closeOnClick: false,
            draggable: false
          });
          setTimeout(window.location.reload, 2000);
        }
      });
    }
  }

  // eslint-disable-next-line react/sort-comp
  showModal() { this.setState({ modalVisible: true }); }

  hideModal() { this.setState({ modalVisible: false }); }

  updatePhone(phone) {
    if (phone.match(/^\+?[0-9\- ]*$/)) {
      this.setState({
        phone,
        phoneIsValid: true
      });
    }
  }

  async onSubmitClick() {
    const validPhone = this.state.phone.replace(/[^0-9]/g, '')
      .match(/^((38)?0?([0-9]{9})|[0-9]{10,15})$/);
    const correctPhone = validPhone
      ? validPhone[0]
        .replace(/^38/, '')
        .replace(/^\d{9}$/, '0$&')
        .replace(/^0\d{9}$/, '38$&')
      : this.state.phone;
    if (correctPhone || correctPhone === '') {
      // eslint-disable-next-line camelcase
      const { project_id } = this.props;
      const { data, signature } = await api.get('project-1', {
        project_id,
        phone: correctPhone,
        language: i18n.language,
        _notify: false
      });

      try {
        localStorage.setItem('lastRequestedProjectId', project_id);
      } catch (e) {
        //
      }

      // eslint-disable-next-line no-undef
      LiqPayCheckout.init({ data, signature, language: i18n.language, mode: 'popup' });
    } else {
      this.setState(({ phoneIsValid: false }));
    }
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <button
          style={styles.button}
          type="button"
          onClick={() => this.showModal()}
          onKeyPress={() => {}}
        >
          {this.props.t('support')}
        </button>
        {this.state.modalVisible
          ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className="modal-wrapper" onClick={(e) => ((e.target === e.currentTarget) ? this.hideModal() : null)}>
              <div className="card modal">
                <div className="modal-content">
                  <label htmlFor="phone">{this.props.t('phone-title')}</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="0502011180"
                    onChange={(e) => this.updatePhone(e.target.value)}
                    value={this.state.phone}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') this.onSubmitClick();
                    }}
                  />
                  {!this.state.phoneIsValid ? <div className="text-small text-danger">{this.props.t('invalid-phone')}</div> : null}
                  <div className="text-small">{this.props.t('viber-notifications')}</div>
                  <br />
                  <button
                    style={styles.button}
                    type="button"
                    onClick={() => this.onSubmitClick()}
                  >
                    {this.props.t('next')}
                  </button>
                  {process.env.ALTERNATIVE_DONATE_LINK
                    ? (
                      <div className="text-small">
                        <br />
                        {this.props.t('alternative-donate-link-1')}
                        <a href={process.env.ALTERNATIVE_DONATE_LINK} target="_blank" rel="noreferrer noopener">{this.props.t('alternative-donate-link-2')}</a>
                      </div>
                    )
                    : null}
                </div>
              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

export default withTranslation()(ButtonDonate);
