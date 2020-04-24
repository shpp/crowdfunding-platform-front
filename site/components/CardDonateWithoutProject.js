/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from '../api';
import { flex, grow, p, column } from '../utils/theme';
import { i18n, withTranslation } from '../utils/translations';

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
      newsletter: false,
      currency: 'UAH',
      fastAmounts: {
        UAH: [100, 200, 500, 1000],
        USD: [5, 25, 50, 100],
        EUR: [5, 25, 50, 100]
      },
      currencies: ['UAH', 'USD', 'EUR']
    };
  }

  componentDidMount() {
    i18n.on('languageChanged', () => {
      if (i18n.language === 'uk' && ['USD', 'EUR'].includes(this.state.currency)) {
        this.setState({ currency: 'UAH', amount: 500 });
      }
    });
    // eslint-disable-next-line no-undef
    LiqPayCheckout.on('liqpay.callback', async (d) => {
      if (['subscribed', 'success'].includes(d.status)) {
        await api.post('paid', {
          id: d.order_id,
          UAH_amount: d.amount_debit,
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
            {this.state.email.length > 0 && <p>{this.props.t('notification.success.email')}</p>}
          </div>
        );
        toast(Toast, { autoClose: false, position: 'top-center', closeOnClick: false, draggable: false });
      }
    });
  }

  async pay() {
    if (this.state.newsletter
      && !(
        this.state.email
        && this.state.email.match(/^([a-zA-Z0-9_\-+.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      )
    ) {
      toast.error(this.props.t('errors.emptyEmail'));
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
      currency: this.state.currency,
      language: i18n.language,
      _notify: false
    });

    // eslint-disable-next-line no-undef
    LiqPayCheckout.init({ data, signature, language: i18n.language, mode: 'popup' });
  }

  render() {
    const { amount, anonymous, newsletter, currency, fastAmounts } = this.state;
    const { t } = this.props;
    return (
      <div style={{ ...flex, ...column, ...grow }} className="donate-card">
        <h2>{t('form.title')}</h2>

        <div className="card" style={{ padding: '20px', marginTop: '37px' }}>
          <div style={styles.subscriptionType}>
            <button
              type="button"
              className={`radio ${this.state.subscribe === true ? 'checked' : ''}`}
              onClick={() => this.setState({ subscribe: true })}
            >
              {t('form.regular')}
            </button>
            <button
              type="button"
              className={`radio ${this.state.subscribe === false ? 'checked' : ''}`}
              onClick={() => this.setState({ subscribe: false })}
            >
              {t('form.oneTime')}
            </button>
          </div>
          <p style={p}>
            <span>{t('form.amount')}:&nbsp;</span>
            <span>
              <input
                type="number"
                min={100}
                value={amount}
                onChange={(e) => this.setState({ amount: +e.target.value })}
                onBlur={() => this.setState({ amount: Math.max(amount, fastAmounts[currency][0]) })}
              />
            </span>
            <span>
              {i18n.language === 'uk'
                ? 'грн'
                : (
                  <select
                    onChange={(e) => this.setState({
                      currency: e.target.value,
                      amount: fastAmounts[e.target.value][2]
                    })}
                    value={currency}
                  >
                    { this.state.currencies.map((c) => (<option key={c} value={c}>{t(`form.currency.${c}`)}</option>))}
                  </select>
                )}
            </span>
          </p>
          <div style={{ ...p, ...flex }}>
            {
            fastAmounts[currency].map((sum) => (
              <button
                type="button"
                key={sum}
                className={`sum ${this.state.amount === sum ? 'selected' : ''}`}
                onClick={() => this.setState({ amount: sum })}
              >
                {sum} {t(`form.currency.${currency}`)}
              </button>
            ))
          }
          </div>
          <h3 style={flex}>
            <span>{t('form.aboutYou.title')}</span>
            <label><input type="checkbox" checked={anonymous} onChange={() => this.setState({ anonymous: !anonymous })} /> {t('form.aboutYou.anonymous')}</label>
          </h3>
          <div style={styles.flex} className={`${anonymous ? 'white-overlay' : ''}`}>
            <label style={{ width: 'calc(100% / 2 - 10px)' }}>
              {t('form.aboutYou.name.label')} <br />
              <input
                type="text"
                placeholder={t('form.aboutYou.name.placeholder')}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </label>
            <label style={{ width: 'calc(100% / 2 - 10px)' }}>
              {t('form.aboutYou.surname.label')} <br />
              <input
                type="text"
                placeholder={t('form.aboutYou.surname.placeholder')}
                value={this.state.surname}
                onChange={(e) => this.setState({ surname: e.target.value })}
              />
            </label>
            <label style={{ width: '100%' }}>
              {t('form.aboutYou.email.label')}<br />
              <input
                type="text"
                value={this.state.email}
                placeholder={t('form.aboutYou.email.placeholder')}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => this.setState({ newsletter: !newsletter })}
              />
              {t('form.aboutYou.newsletter')}
            </label>
          </div>
          <div className="button-wrapper">
            <button
              className="submit-button"
              type="button"
              onClick={() => this.pay()}
            >
              {
                this.state.subscribe
                  ? (
                    <span>
                      {t('form.button.regular', { amount, curr: t(`form.currency.${currency}`) })}
                      &nbsp;<strong>{t('form.regular').toLowerCase()}</strong>
                    </span>
                  )
                  : t('form.button.oneTime')
              }
            </button>
            <div id="formContainer" className="hidden" />
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation('help')(CardDonateWithoutProject);