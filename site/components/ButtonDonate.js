import { toast } from 'react-toastify';

import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import api from '../fetch';

const styles = {
  wrapper: {
    textAlign: 'center',
    margin: '20px 0',
  },
  button: {
    maxWidth: '275px',
  },
  form: {
    display: 'none'
  }
};

// eslint-disable-next-line camelcase
const ButtonDonate = ({ project_id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneIsValid, setPhoneValid] = useState(true);
  const [phone, setPhone] = useState('');
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    LiqPayCheckout.on('liqpay.callback', async (d) => {
      let processableCallback = true;

      // hack for several same requests
      try {
        // eslint-disable-next-line camelcase
        processableCallback = localStorage.getItem('lastRequestedProjectId') === `${project_id}`
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
            <p>{t('notification.success.general')}</p>
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
  }, []);

  function updatePhone(newPhone) {
    if (newPhone.match(/^\+?[0-9\- ]*$/)) {
      setPhone(newPhone);
      setPhoneValid(true);
    }
  }

  async function onSubmitClick() {
    const validPhone = phone.replace(/[^0-9]/g, '')
      .match(/^((38)?0?([0-9]{9})|[0-9]{10,15})$/);
    const correctPhone = validPhone
      ? validPhone[0]
        .replace(/^38/, '')
        .replace(/^\d{9}$/, '0$&')
        .replace(/^0\d{9}$/, '38$&')
      : phone;
    if (!correctPhone && correctPhone !== '') {
      setPhoneValid(false);
      return;
    }
    // eslint-disable-next-line camelcase
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
  }

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.button}
        className="button-primary"
        type="button"
        onClick={() => setModalVisible(true)}
        onKeyPress={() => {}}
      >
        {t('support')}
      </button>
      {modalVisible
        ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div className="modal-wrapper" onClick={(e) => ((e.target === e.currentTarget) ? setModalVisible(false) : null)}>
            <div className="card modal">
              <div className="modal-content">
                <label htmlFor="phone">{t('phone-title')}</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="0502011180"
                  onChange={(e) => updatePhone(e.target.value)}
                  value={phone}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') onSubmitClick();
                  }}
                />
                {!phoneIsValid ? <div className="text-small text-danger">{t('invalid-phone')}</div> : null}
                <div className="text-small">{t('viber-notifications')}</div>
                <br />
                <button
                  style={styles.button}
                  type="button"
                  className="button-primary"
                  onClick={onSubmitClick}
                >
                  {t('next')}
                </button>
                {process.env.NEXT_PUBLIC_ALTERNATIVE_DONATE_LINK
                  ? (
                    <div className="text-small">
                      <br />
                      {t('alternative-donate-link-1')}
                      <a href={process.env.NEXT_PUBLIC_ALTERNATIVE_DONATE_LINK} target="_blank" rel="noreferrer noopener">{t('alternative-donate-link-2')}</a>
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
};

export default ButtonDonate;
