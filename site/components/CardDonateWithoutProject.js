/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import colors from '../theme/colors';
import api from '../api';
import { flex, grow, p, column } from '../theme/utils';

const styles = {
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    display: 'flex',
  },
  projectTitle: {
    margin: '5px 0'
  },
  buttonWrapper: {
    margin: '20px 0'
  },
  subscriptionType: {
    position: 'absolute',
    top: '-37px',
    left: '0'
  }
};

class CardDonateWithoutProject extends Component {
  constructor(props) {
    super(props);
    this.successToast = null;
    this.state = {
      subscribe: true,
      amount: 500,
      anonymous: false,
      name: '',
      surname: '',
      email: '',
      newsletter: false
    };
  }

  async pay() {
    if (this.state.newsletter
      && !(
        this.state.email
        && this.state.email.match(/^([a-zA-Z0-9_\-+.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      )
    ) {
      toast.error('Щоб підписатись на розсилку, вкажіть свій email');
      return;
    }
    const personalInfo = this.state.anonymous ? {} : {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      newsletter: this.state.newsletter
    };
    const { data, signature } = await api.post('pay', {
      ...personalInfo,
      subscribe: this.state.subscribe,
      amount: this.state.amount,
      _notify: false
    });
    let toastShowed = false;
    // eslint-disable-next-line no-undef
    LiqPayCheckout.init({ data, signature, language: i18n.language, mode: 'popup' })
      .on('liqpay.callback', async (d) => {
        if (['subscribed', 'success'].includes(d.status)) {
          await api.post('paid', {
            ...personalInfo,
            subscribe: this.state.subscribe,
            amount: this.state.amount,
            currency: this.state.currency,
            language: i18n.language,
            order_id: d.order_id,
            _notify: false
          });
          const Toast = () => (
            <div>
              <p>{this.props.t('notification.success.general')}</p>
              {
                d.status === 'subscribed' && this.state.email.length === 0
                  ? <div dangerouslySetInnerHTML={{ __html: this.props.t('notification.success.orderId', { orderId: d.order_id }) }} />
                  : null
              }
            </div>
          );
          toast(Toast, { autoClose: false, position: 'top-center', closeOnClick: false, draggable: false });
        }
      });
  }

  render() {
    const { amount, anonymous, newsletter } = this.state;
    return (
      <div style={{ ...flex, ...column, ...grow }}>
        <h2>Підтримайте нашу діяльність</h2>

        <div className="card" style={{ padding: '20px', marginTop: '37px' }}>
          <div style={styles.subscriptionType}>
            <button
              type="button"
              className={`radio ${this.state.subscribe === true ? 'checked' : ''}`}
              onClick={() => this.setState({ subscribe: true })}
            >
              Щомісяця
            </button>
            <button
              type="button"
              className={`radio ${this.state.subscribe === false ? 'checked' : ''}`}
              onClick={() => this.setState({ subscribe: false })}
            >
              Одноразово
            </button>
          </div>
          <p style={p}>
            <span>Сума внеску:&nbsp;</span>
            <span>
              <input
                type="number"
                min={100}
                value={amount}
                onChange={(e) => this.setState({ amount: +e.target.value })}
                onBlur={() => this.setState({ amount: Math.max(amount, 100) })}
              />
            </span>
            <span>грн</span>
          </p>
          <div style={{ ...p, ...flex }}>
            {
            [100, 200, 500, 1000].map((sum) => (
              <button
                type="button"
                key={sum}
                className={`sum ${this.state.amount === sum ? 'selected' : ''}`}
                onClick={() => this.setState({ amount: sum })}
              >
                {sum} грн
              </button>
            ))
          }
          </div>
          <h3 style={flex}>
            <span>Розкажіть про себе</span>
            <label><input type="checkbox" checked={anonymous} onChange={() => this.setState({ anonymous: !anonymous })} /> анонімно</label>
          </h3>
          <div style={styles.flex} className={`${anonymous ? 'white-overlay' : ''}`}>
            <label style={{ width: 'calc(100% / 2 - 10px)' }}>
              Ім&apos;я <br />
              <input
                type="text"
                placeholder="Леся"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </label>
            <label style={{ width: 'calc(100% / 2 - 10px)' }}>
              Прізвище <br />
              <input
                type="text"
                placeholder="Українка"
                value={this.state.surname}
                onChange={(e) => this.setState({ surname: e.target.value })}
              />
            </label>
            <label style={{ width: '100%' }}>
              Електронна пошта <br />
              <input
                type="text"
                value={this.state.email}
                placeholder="pryvit@poshta.com"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => this.setState({ newsletter: !newsletter })}
              />
              Хочу отримувати регулярну розсилку зі звітами та інсайтами
            </label>
          </div>
          <div className="button-wrapper">
            <button
              className="submit-button"
              type="button"
              onClick={() => this.pay()}
            >
              {this.state.subscribe ? <span>Підписатись на {this.state.amount} грн <strong>щомісяця</strong></span> : 'Підтримати одноразово'}
            </button>
            <div id="formContainer" className="hidden" />
          </div>
        </div>

        <style jsx>
          {`
        ::placeholder {
          color: #aaa;
        }
        .radio {
          padding: 10px;
          border: none;
          border-radius: 0;
          cursor: pointer;
          font-size: 14px;
          outline-color: white;
          flex-grow: 1;
          transition: all 0.25s;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          background-color: #eeeeee;
        }
        .radio.checked {
          background: white;
          color: green;
        }
        .radio:hover {
          background-color: rgb(250, 250, 250)
        }
        input[type=number],
        input[type=text] {
          border: none;
          border-bottom: 1px solid #aaa;
          outline-color: white;
          font-size: 16px;
          width: 55px;
          color: #222;
          padding: 4px 1px;
        }
        .sum {
          padding: 7px;
          border: none;
          border-radius: 0;
          cursor: pointer;
          color: #444;
          background-color: #CEE1DB;
        }
        .sum:hover {
          background-color: ${colors.green};
          color: white;
        }
        .sum.checked {
          background-color: #45BD79  
        }
        label {
          display: inline-block;
          margin: 0 5px 15px;
          font-size: 11px;
          font-weight: normal;
        }
        input[type=checkbox] {
          vertical-align: middle;
          margin-top: 0;
        }
        input[type=text] {
          font-size: 14px;
          width: 100%;
          
        }
        .white-overlay {
          position: relative;
        }
      
        .white-overlay:after {
          background: rgba(255, 255, 255, .6);
          width: 100%;
          position: absolute;
          top: 0;
          content: '';
          left: 0;
          height: 100%;
          z-index: 1;
        }
        `}
        </style>
      </div>
    );
  }
}
export default CardDonateWithoutProject;
