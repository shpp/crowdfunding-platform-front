import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { column, flex } from '../../utils/theme';

const Header = ({ links, brand }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation('header');

  const changeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Navbar collapseOnSelect expand="md" className="header">
      <Link href="/" className="no-underline">
        <Navbar.Brand>
          <h1 className="title">
            {brand ?? t('logo')}<span className="text-green">++</span>
          </h1>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0, width: '100%', justifyContent: 'flex-end' }}>
        {
          links.map((l) => (
            <Link href={l.href} key={l.href} className="list-item">
              {l.text}
            </Link>
          ))
        }
        {!router.pathname.startsWith('/admin') && (
        <div style={{ ...flex, ...column, justifyContent: 'center' }}>
          <button
            type="button"
            className={`translate-button ${i18n.language === 'en' && 'active'}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`translate-button ${i18n.language === 'uk' && 'active'}`}
            onClick={() => changeLanguage('uk')}
          >
            UA
          </button>
        </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
