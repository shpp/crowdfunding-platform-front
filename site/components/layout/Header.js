import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { column, flex } from '../../utils/theme';

const Header = ({ links, brand }) => {
  const locale = useLocale();
  const pathname = usePathname() ?? '';

  const t = useTranslations('header');

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
        {!pathname.startsWith('/admin') && (
          <div style={{ ...flex, ...column, justifyContent: 'center' }}>
            <Link href={pathname} locale='en'>
              <button
                type="button"
                className={`translate-button ${locale === 'en' && 'active'}`}

              >
                EN
              </button>
            </Link>
            <Link href={pathname} locale='uk'>
              <button
                type="button"
                className={`translate-button ${locale === 'uk' && 'active'}`}

              >
                UA
              </button>
            </Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
