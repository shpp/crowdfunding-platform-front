import { withTranslation, Link } from '../../utils/translations';

import SocialIcon from '../SocialIcon';
import Address from '../../assets/icon/001-pin.svg';
import Phone from '../../assets/icon/002-electronics.svg';
import Email from '../../assets/icon/003-email.svg';
import Instagram from '../../assets/icon/004-instagram.svg';
import Telegram from '../../assets/icon/005-telegram.svg';
import Facebook from '../../assets/icon/006-facebook.svg';
import MasterCard from '../../assets/mcsc.svg';
import Visa from '../../assets/vbv.svg';
import { flex } from '../../utils/theme';

const instagram = 'https://instagram.com/shpp.kr';
const facebook = 'https://facebook.com/shpp.kr';
const telegram = 'https://t.me/shppkr';

const Footer = ({ t }) => {
  return (
    <footer>
      <div className="container">
        <div style={{ ...flex }} className="row">
          <section id="contacts">
            <article>
              <i><Address className="icon" /></i>
              <div>
                <a href="https://g.page/shpp-kr?share">{t('location')}</a>
              </div>
            </article>
            <article>
              <i><Phone className="icon" /></i>
              <div>
                <a href="tel:0502011180">050 20 111 80</a>
              </div>
            </article>
            <article>
              <i><Email className="icon" /></i>
              <div>
                <a href="mailto:info@programming.org.ua">info@programming.org.ua</a>
              </div>
            </article>
          </section>
          <section>
            <Link href="/agreement">
              <a>{t('agreement')}</a>
            </Link>
            <div>
              <MasterCard className="icon-big" />
              <Visa className="icon-big" />
            </div>
          </section>
        </div>
        <div style={{ ...flex }} className="row notices">
          <p>&copy; {new Date().getFullYear()} <a href="https://programming.org.ua">Ш++</a>. {t('copyright')} Icons made by&nbsp;<a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>&nbsp;from&nbsp;<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
          <p style={{ ...flex, width: '100px' }}>
            <SocialIcon link={instagram}>
              <Instagram className="icon" />
            </SocialIcon>
            <SocialIcon link={telegram}>
              <Telegram className="icon" />
            </SocialIcon>
            <SocialIcon link={facebook}>
              <Facebook className="icon" />
            </SocialIcon>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default withTranslation('footer')(Footer);
