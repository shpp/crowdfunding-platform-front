import Page from '../components/layout/Page';
import { kowoAge } from '../utils';
import { withTranslation } from '../utils/translations';

const AboutPage = ({ t }) => (
  <Page>
    <div className="container">
      {t('sections', { returnObjects: true }).map((_, i) => (
        <div key={i}>
          <h3>{t(`sections.${i}.title`)}</h3>
          <section>
            {t(`sections.${i}.p`, { returnObjects: true, years: kowoAge }).map((par) => (
              <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
            ))}
          </section>
        </div>
      ))}
    </div>
  </Page>
);

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['about'],
});


export default withTranslation('about')(AboutPage);
