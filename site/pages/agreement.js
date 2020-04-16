import Page from '../components/layout/Page';
import { withTranslation } from '../utils/translations';

const Agreement = ({ t }) => (
  <Page>
    <div className="container">
      <h2>{t('title')}</h2>
      {t('sections', { returnObjects: true }).map((_, i) => (
        <div key={i}>
          {t(`sections.${i}.title`, { defaultValue: '' }) !== '' && <h3>{t(`sections.${i}.title`)}</h3>}
          <section>
            {t(`sections.${i}.p`, { app_url: process.env.APP_URL, returnObjects: true }).map((par) => (
              <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
            ))}
          </section>
        </div>
      ))}
    </div>
  </Page>
);

Agreement.getInitialProps = async () => ({
  namespacesRequired: ['agreement'],
});

export default withTranslation('agreement')(Agreement);
