/* eslint-disable jsx-a11y/label-has-associated-control */
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import api from '../fetch';
import { flex, grow, p, column } from '../utils/theme';

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

const fastAmounts = {
  UAH: [100, 200, 500, 1000],
  USD: [5, 25, 50, 100],
  EUR: [5, 25, 50, 100]
};
const currencies = ['UAH', 'USD', 'EUR'];

const CardDonateWithoutProject = ({
  exchangeRate,
  subscriptions: { money_amount: monthlyMoney, donators_amount: monthlyDonators }
}) => {
  const [subscribe, setSubscribe] = useState(true);
  const [amount, setAmount] = useState(500);
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [currency, setCurrency] = useState('UAH');
  const { t, i18n } = useTranslation('help');

  useEffect(() => {
    const changeCurrency = (lang) => {
      if (lang === 'uk' && ['USD', 'EUR'].includes(currency)) {
        setCurrency('UAH');
        setAmount(500);
      }
      if (lang === 'en' && currency === 'UAH') {
        setCurrency('USD');
        setAmount(50);
      }
    };

    i18n.on('languageChanged', () => {
      changeCurrency(i18n.language);
    });
    changeCurrency(i18n.language);

    // eslint-disable-next-line no-undef
    LiqPayCheckout.on('liqpay.callback', async (d) => {
      let processableCallback = true;

      // hack for several same requests
      try {
        processableCallback = localStorage.getItem('lastRequestedProjectId') === 'shpp'
          && localStorage.getItem('lastHandledOrderId') !== d.order_id;
      } catch (e) {
        //
      }

      if (processableCallback && ['subscribed', 'success'].includes(d.status)) {
        try {
          localStorage.setItem('lastHandledOrderId', d.order_id);
        } catch (e) {
          //
        }
        await api.post('donate-2', {
          id: d.order_id,
          UAH_amount: d.amount_debit,
          status: d.status,
          _notify: false
        });
        // eslint-disable-next-line no-undef
        const Toast = () => (
          <div>
            <p>{t('notification.success.general')}</p>
            {
              d.status === 'subscribed' && email.length === 0
                ? <div dangerouslySetInnerHTML={{ __html: t('notification.success.orderId', { orderId: d.order_id }) }} />
                : null
            }
            {email.length > 0 && <p>{t('notification.success.email')}</p>}
          </div>
        );
        toast(Toast, { autoClose: false, position: 'top-center', closeOnClick: false, draggable: false });
      }
    });
  });

  const pay = async () => {
    if (newsletter
      && !(
        email
        && email.match(/^([a-zA-Z0-9_\-+.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      )
    ) {
      toast.error(t('errors.emptyEmail'));
      return;
    }
    const personalInfo = anonymous ? {} : {
      email,
      name,
      surname,
      newsletter
    };
    const { data, signature } = await api.post('donate-1', {
      ...personalInfo,
      subscribe,
      amount,
      currency,
      language: i18n.language,
      _notify: false
    });

    try {
      localStorage.setItem('lastRequestedProjectId', 'shpp');
    } catch (e) {
      //
    }

    // eslint-disable-next-line no-undef
    LiqPayCheckout.init({ data, signature, language: i18n.language, mode: 'popup' });
  };

  return (
    <div style={{ ...flex, ...column, ...grow }} className="donate-card">
      <h2>{t('form.title')}</h2>

      <div className="card" style={{ padding: '20px', marginTop: '37px' }}>
        <div style={styles.subscriptionType}>
          <button
            type="button"
            className={`radio ${subscribe === true ? 'checked' : ''}`}
            onClick={() => setSubscribe(true)}
          >
            {t('form.regular')}
          </button>
          <button
            type="button"
            className={`radio ${subscribe === false ? 'checked' : ''}`}
            onClick={() => setSubscribe(false)}
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
              onChange={(e) => setAmount(+e.target.value)}
              onBlur={() => setAmount(Math.max(amount, fastAmounts[currency][0]))}
            />
          </span>
          <span>
            {i18n.language === 'uk'
              ? 'грн'
              : (
                <select
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setAmount(fastAmounts[e.target.value][2]);
                  }}
                  value={currency}
                >
                  { currencies.map((c) => (<option key={c} value={c}>{t(`form.currency.${c}`)}</option>))}
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
              className={`sum ${amount === sum ? 'selected' : ''}`}
              onClick={() => setAmount(sum)}
            >
              {sum} {t(`form.currency.${currency}`)}
            </button>
          ))
        }
        </div>
        <h3 style={flex}>
          <span>{t('form.aboutYou.title')}</span>
          <label><input type="checkbox" checked={anonymous} onChange={() => setAnonymous(!anonymous)} /> {t('form.aboutYou.anonymous')}</label>
        </h3>
        <div style={styles.flex} className={`${anonymous ? 'white-overlay' : ''}`}>
          <label style={{ width: 'calc(100% / 2 - 10px)' }}>
            {t('form.aboutYou.name.label')} <br />
            <input
              type="text"
              placeholder={t('form.aboutYou.name.placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label style={{ width: 'calc(100% / 2 - 10px)' }}>
            {t('form.aboutYou.surname.label')} <br />
            <input
              type="text"
              placeholder={t('form.aboutYou.surname.placeholder')}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label style={{ width: '100%' }}>
            {t('form.aboutYou.email.label')}<br />
            <input
              type="text"
              value={email}
              placeholder={t('form.aboutYou.email.placeholder')}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            {t('form.aboutYou.newsletter')}
          </label>
        </div>
        <div className="button-wrapper">
          <button
            className="button-primary"
            type="button"
            onClick={pay}
          >
            {
              subscribe
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
      <p><small>{monthlyDonators ? t('subscriptionsList', { money: Math.round(monthlyMoney / exchangeRate.buy), donators: monthlyDonators, currency: exchangeRate.ccy }).replace('&nbsp;', '\xa0') : ''}</small></p>
    </div>
  );
};

export default CardDonateWithoutProject;
