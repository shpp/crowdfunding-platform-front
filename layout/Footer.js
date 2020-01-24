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
  iconSmall: {
    width: '20px',
    height: '20px',
  },
  iconMid: {
    width: '30px',
    height: '30px',
  },
  iconBig: {
    width: '80px',
    height: '40px',
    paddingRight: '10px',
  },
};
const instagram = 'https://www.instagram.com/shpp.kr/?igshid=1cuwl3vm5907d';
const facebook = 'https://www.facebook.com/pg/shpp.kr/posts/';
const telegram = 'https://t.me/shppkr';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="webpage">
          <a href="https://programming.kr.ua/">https://programming.kr.ua/</a>
          <div className="social">
            <SocialIcon link={instagram}>
              <Instagram style={style.iconMid} />
            </SocialIcon>
            <SocialIcon link={telegram}>
              <Telegram style={style.iconMid} />
            </SocialIcon>
            <SocialIcon link={facebook}>
              <Facebook style={style.iconMid} />
            </SocialIcon>
          </div>
          <div className="flaticon_link">
Icons made by&nbsp;
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
          &nbsp;from&nbsp;
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
        </div>
        <section>
          <article>
            <i>
              <Address style={style.iconSmall} />
            </i>
            <div>
            Україна, м. Кропивницький
            пров. Василівський, 10
            </div>
          </article>
          <article>
            <i>
              <Phone style={style.iconSmall} />
            </i>
            <div>
            050 20 111 80
            </div>
          </article>
          <article>
            <i>
              <Email style={style.iconSmall} />
            </i>
            <div>
            info@programming.kr.ua
            </div>
          </article>
        </section>
        <section>
          <Link href="/agreement">
            <a>Публічна оферта</a>
          </Link>
          <div>
            <MasterCard style={style.iconBig} />
            <Visa style={style.iconBig} />
          </div>
        </section>
      </div>
      <style jsx>
        {
         `
         .footer {
           display: flex;
         }
         .container {
           border-top: 1px solid ${theme.green};
           padding: 10px;
           width: 80%;
           margin: auto;
           display: flex;
           justify-content: space-between;
         }    
         section {
          display: flex;
          flex-direction: column;
          justify-content: space-between;   
          padding: 0 10px;
         }     
         article {
          display: flex;
         }
         a {
          text-decoration: underline;
          color: ${theme.text};
          font-size: 16px;
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
         `
       }
      </style>
    </div>
  );
};

export default Footer;
