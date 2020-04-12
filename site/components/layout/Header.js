import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
// import Link from 'next/link';
import { i18n, withTranslation, Link } from '../../utils/translations';
import { colors, column, flex } from '../../utils/theme';

const styles = {
  container: {
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    borderBottom: `5px solid ${colors.green}`,
    backgroundColor: colors.white,
  },
};

const Header = ({ links, t }) => {
  return (
    <Navbar collapseOnSelect expand="md" style={styles.container}>
      <Link href="/">
        <Navbar.Brand>
          <h1 className="title">
            {t('logo')}<span className="text-green">++</span>
          </h1>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0, width: '100%', justifyContent: 'flex-end' }}>
        {
          links.map((l) => (
            <Link href={l.href} key={l.href}>
              <a className="list-item">{l.text}</a>
            </Link>
          ))
        }
        <div style={{ ...flex, ...column, justifyContent: 'center' }}>
          <button
            type="button"
            className={`translate-button ${i18n.language === 'en' && 'active'}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`translate-button ${i18n.language === 'uk' && 'active'}`}
            onClick={() => i18n.changeLanguage('uk')}
          >
            UA
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withTranslation('header')(Header);
