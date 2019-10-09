import Radium from 'radium';
import Link from 'next/link';
import colors from '../theme/colors'
import breakpoints from "../theme/breakpoints";

const styles = {
  container: {
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `5px solid ${colors.green}`,
    backgroundColor: colors.white
  },
  logo: {
    fontFamily: 'arial',
    fontSize: '330%',
    fontWeight: '700',
    lineHeight: '80px',
    textDecoration: 'none',
    display: 'flex',
    [breakpoints.breakpointLarge]: {
      lineHeight: '50px',
      fontSize: '40px',
    }
  },
  sh: {
    color: colors.black
  },
  plus: {
    color: colors.green
  },
  slash: {
    fontSize: '70%',
    margin: '0 25px',
    color: colors.text
  },
  crowdfunding: {
    fontSize: '40%',
    color: colors.text
  },
  nav: {
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
  },
  listItem: {
    padding: '5px 15px',
    color: colors.text,
  },
  listItemMiddle: {
    borderLeft: '2px solid #2c3e50',
    borderRight: '2px solid #2c3e50'
  }
};

const Header = () => {
  return (
    <header style={styles.container}>
      <Link href="/">
        <a style={styles.logo}>
          <span style={styles.sh}>Ш</span>
          <span style={styles.plus}>++</span>
          <span style={styles.slash}>/</span>
          <span style={styles.crowdfunding}>crowdfunding platform</span>
        </a>
      </Link>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link href="/about">
              <a style={styles.listItem}>про нас</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="#" style={{...styles.listItem, ...styles.listItemMiddle}}>проекти</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="#" style={styles.listItem}>вже зібрали</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Radium(Header);
