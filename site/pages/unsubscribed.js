import Page from '../components/layout/Page';
import { withTranslation } from '../utils/translations';

const UnsubscribedPage = ({ t }) => (
  <Page>
    <div className="container">
      {t('sections', { returnObjects: true }).map((_, i) => (
        <div key={i}>
          <h3>{t(`sections.${i}.title`)}</h3>
          <section>
            {t(`sections.${i}.p`, { returnObjects: true }).map((par) => (
              <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
            ))}
          </section>
        </div>
      ))}
    </div>
  </Page>
);

UnsubscribedPage.getInitialProps = async () => ({
  namespacesRequired: ['unsubscribed'],
});


export default withTranslation('unsubscribed')(UnsubscribedPage);
