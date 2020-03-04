import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import colors from '../theme/colors';

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
  title: {
    fontFamily: 'arial',
    fontSize: '56px',
    fontWeight: '700',
    lineHeight: '56px',
    display: 'flex',
    cursor: 'pointer'
  },
  logo: {
    color: colors.green,
    textDecoration: 'none',
  },
  slash: {
    fontSize: '70%',
    margin: '0 25px',
    color: colors.text,
  },
  crowdfunding: {
    fontSize: '40%',
    color: colors.text,
  },
  listItem: {
    padding: '12px 15px',
    margin: '0 5px',
    color: colors.text,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },

  burgerWrapper: {
    display: 'none',
  },
};

const Header = ({ links }) => (
  <Navbar collapseOnSelect expand="md" style={styles.container}>
    <Link href="/">
      <Navbar.Brand>
        <span style={styles.title} className="title">
          <span style={styles.crowdfunding} className="logo">Підтримай<span className="text-green">++</span></span>
        </span>
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0, width: '100%', justifyContent: 'flex-end' }}>
      {
        links.map((l) => (
          <Link href={l.href} key={l.href}>
            <a className="list-item" style={styles.listItem}>{l.text}</a>
          </Link>
        ))
      }
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
