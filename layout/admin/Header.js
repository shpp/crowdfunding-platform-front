import React from 'react';
import { SliderReverse } from 'react-burgers';
import Link from 'next/link';
import colors from '../../theme/colors';

const styles = {
  container: {
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `5px solid ${colors.green}`,
    backgroundColor: colors.white,
  },
  logo: {
    fontFamily: 'arial',
    fontSize: '330%',
    fontWeight: '700',
    lineHeight: '80px',
    textDecoration: 'none',
    display: 'flex',
  },
  sh: {
    color: colors.black,
  },
  plus: {
    color: colors.green,
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
  nav: {
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    marginTop: '1rem',
  },
  listItem: {
    padding: '5px 10px',
    color: colors.text,
    whiteSpace: 'nowrap',
  },
  listItemMiddle: {
    borderLeft: '2px solid #2c3e50',
    borderRight: '2px solid #2c3e50',
  },
  burgerWrapper: {
    display: 'none',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuExpanded: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => {
      return { isMenuExpanded: !prevState.isMenuExpanded };
    });
  };

  render() {
    const { isMenuExpanded } = this.state;
    return (
      <header style={styles.container} className="site-header">
        {!isMenuExpanded
          && (
          <Link href="/">
            <a style={styles.logo} className="logo">
              <span style={styles.sh}>Ш</span>
              <span style={styles.plus}>++</span>
              <span style={styles.slash} className="logo__slash">/</span>
              <span style={styles.crowdfunding}>crowdfunding platform</span>
            </a>
          </Link>
          )}
        <nav>
          <ul style={styles.navList} className="nav-list">
            <li>
              <Link href="/admin/add">
                <a style={styles.listItem} className="list-item">додати</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/projects">
                <a style={{ ...styles.listItem, ...styles.listItemMiddle }} className="list-item">
                  проекти
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/transactions">
                <a style={styles.listItem} className="list-item">транзакції</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div
          onClick={this.toggleMenu}
          onKeyPress={() => {}}
          style={styles.burgerWrapper}
          className="burger-wrapper"
          role="button"
          tabIndex="0"
        >
          <SliderReverse
            active={isMenuExpanded}
            padding="12px 10px"
            lineHeight={3}
            width={30}
          />
        </div>
        <style jsx>
          {
          `@media screen and (max-width: 1240px){
            .logo{
              line-height: 50px !important;
              font-size: 40px !important;
            }
          }
          
          @media screen and (max-width: 768px){
            .nav-list{
              display: ${isMenuExpanded ? 'flex' : 'none'} !important;
              padding-left: 0;
              margin: 0;
            }
            
            .site-header{
              justify-content: space-between !important;
              padding: 5px 10px !important;
            }
            
            .burger-wrapper{
              display: block !important;
            }
          }
          
          @media screen and (max-width: 460px){
            .logo__slash{
              margin 0 5px !important;
            }
            
            .logo{
              line-height: 40px !important;
              font-size: 30px !important;
            }
            
            .list-item{
              padding: 5px !important;
            }
          }
      `
}
        </style>
      </header>
    );
  }
}

export default Header;
