import Link from 'next/link';
import Address from '../assets/icon/001-pin.svg';
import Phone from '../assets/icon/002-electronics.svg';
import Email from '../assets/icon/003-email.svg';
import Instagram from '../assets/icon/004-instagram.svg';
import Telegram from '../assets/icon/005-telegram.svg';
import Facebook from '../assets/icon/006-facebook.svg';
import MasterCard from '../assets/mcsc.svg';
import Visa from '../assets/vbv.svg';
import SocialIcon from '../components/SocialIcon';
import theme from '../theme/colors';


const style = {
  footer: {
    navigation: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    notices: {
      display: 'flex',
      marginTop: '40px',
      justifyContent: 'space-between',
      fontSize: '80%',
      borderTop: '1px solid grey'
    },
    socialIcons: {
      container: {
        display: 'flex',
        width: '100px',
        justifyContent: 'space-between',
      },
      icon: {
        width: '20px',
        height: '20px'
      },
      iconBig: {
        marginRight: '15px',
        marginTop: '15px'
      }
    },
  },
};
const instagram = 'https://instagram.com/shpp.kr';
const facebook = 'https://facebook.com/shpp.kr';
const telegram = 'https://t.me/shppkr';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div style={style.footer.navigation} className="row">
          <section id="contacts">
            <article>
              <i>
                <Address style={style.footer.socialIcons.icon} />
              </i>
              <div>
                <a href="https://g.page/shpp-kr?share">
                  Україна, м. Кропивницький,&nbsp;
                  пров. Василівський, 10
                </a>
              </div>
            </article>
            <article>
              <i>
                <Phone style={style.footer.socialIcons.icon} />
              </i>
              <div>
                <a href="tel:0502011180">050 20 111 80</a>
              </div>
            </article>
            <article>
              <i>
                <Email style={style.footer.socialIcons.icon} />
              </i>
              <div>
                <a href="mailto:info@programming.kr.ua">info@programming.kr.ua</a>
              </div>
            </article>
          </section>
          <section>
            <Link href="/agreement">
              <a>Публічна оферта</a>
            </Link>
            <div>
              <MasterCard style={style.footer.socialIcons.iconBig} />
              <Visa style={style.footer.socialIcons.iconBig} />
            </div>
          </section>
        </div>
        <div style={style.footer.notices} className="row">
          <p>&copy; {new Date().getFullYear()} <a href="https://programming.kr.ua">Ш++</a>. Всі права захищено. Icons made by&nbsp;<a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>&nbsp;from&nbsp;<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
          <p style={style.footer.socialIcons.container}>
            <SocialIcon link={instagram}>
              <Instagram style={style.footer.socialIcons.icon} />
            </SocialIcon>
            <SocialIcon link={telegram}>
              <Telegram style={style.footer.socialIcons.icon} />
            </SocialIcon>
            <SocialIcon link={facebook}>
              <Facebook style={style.footer.socialIcons.icon} />
            </SocialIcon>
          </p>
        </div>
      </div>
      <style jsx>
        {
         `
         footer {
           display: flex;
           min-height: 400px;
           background-color: white;
         }
         footer .container {
           padding: 10px;
           width: 80%;
           margin: auto;
         }    
         footer section {
           display: flex;
           flex-direction: column;
           justify-content: space-between;   
           padding: 0 10px;
         }     
         article {
           display: flex;
         }
         a {
           text-decoration: none;
           color: ${theme.text};
           /*font-size: 16px;*/
         }
         a:hover {
           color: ${theme.green};
           text-decoration: none;
         }
         .flaticon_link, .flaticon_link a {
           font-size: 10px;                 
         }
         i { 
           margin-right: 10px;
         }
         .social {          
           display: flex;
           justify-content: space-between;
         }
         @media screen and (max-width: 460px) {
           .row {
             flex-direction: column; 
           }
           .row section {
             margin: 15px 0;
           }
           article:not(:last-child) {
             margin-bottom: 15px;
           }
         }            
         `
       }
      </style>
    </footer>
  );
};

export default Footer;
