import React from 'react';
import Link from 'next/link';
import colors from '../theme/colors';

const styles = {
  container: {
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `5px solid ${colors.green}`,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: 'arial',
    fontSize: '330%',
    fontWeight: '700',
    lineHeight: '80px',
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
    const { links } = this.props;
    return (
      <header style={styles.container} className="site-header">
        {!isMenuExpanded
        && (
          <Link href="/">
            <div style={styles.title} className="title">
              <span style={styles.crowdfunding} className="logo">Підтримай<span style={{ color: 'green' }}>++</span></span>
            </div>
          </Link>
        )}
        <nav>
          {
            links.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className="list-item" style={styles.listItem}>{l.text}</a>
              </Link>
            ))
          }
        </nav>
        <style jsx>
          {`
          .logo::first-letter {
            color: ${colors.black};
          }
          
          .list-item:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          @media screen and (max-width: 1240px){
            .title{
              line-height: 50px !important;
              font-size: 40px !important;
            }
          }
          
          @media screen and (max-width: 768px){
            
            .site-header{
              justify-content: space-between !important;
              padding: 5px 10px !important;
            }
          }
          
          @media screen and (max-width: 460px){
            .logo__slash{
              margin 0 5px !important;
            }
            
            .title{
              line-height: 40px !important;
              font-size: 30px !important;
            }
            
            .list-item{
              padding: 5px !important;
              font-size: 14px;
              margin: 0!important;
            }
          }
      `}
        </style>
      </header>
    );
  }
}

export default Header;
