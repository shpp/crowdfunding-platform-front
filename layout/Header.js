const styles = {
  container: {
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '5px solid #27ae60',
    backgroundColor: '#fff'
  },
  logo: {
    fontFamily: 'arial',
    fontSize: '330%',
    fontWeight: '700',
    lineHeight: '80px',
    textDecoration: 'none',
    display: 'flex'
  },
  sh: {
    color: '#000'
  },
  plus: {
    color: '#27ae60'
  },
  slash: {
    fontSize: '70%',
    margin: '0 25px',
    color: '#2c3e50'
  },
  crowdfunding: {
    fontSize: '40%',
    color: '#2c3e50'
  },
  nav: {
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
  },
  listItem: {
    padding: '5px 15px',
    color: '#2c3e50',
  },
  listItemMiddle: {
    borderLeft: '2px solid #2c3e50',
    borderRight: '2px solid #2c3e50'
  }
};

const Header = () => {
  return (
    <header style={styles.container}>
      <a href="/" style={styles.logo}>
        <span style={styles.sh}>Ш</span>
        <span style={styles.plus}>++</span>
        <span style={styles.slash}>/</span>
        <span style={styles.crowdfunding}>crowdfunding platform</span>
      </a>
      <nav>
        <ul style={styles.navList}>
          <li>
            <a href="#" style={styles.listItem}>про нас</a>
          </li>
          <li>
            <a href="#" style={{...styles.listItem, ...styles.listItemMiddle}}>проекти</a>
          </li>
          <li>
            <a href="#" style={styles.listItem}>вже зібрали</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
