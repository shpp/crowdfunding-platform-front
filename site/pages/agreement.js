import { useEffect, useState } from 'react';
import Page from '../components/layout/Page';
import { withTranslation } from '../utils/translations';


const Agreement = ({ t }) => {
  const [highlightedSection, setHighlightedSection] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHighlightedSection(window.location.hash);
    }
  }, []);


  return (
    <Page>
      <div className="container">
        <h2>{t('title')}</h2>
        {t('sections', { returnObjects: true }).map((_, i) => {
          const isLinkedToThisId = highlightedSection.endsWith(t(`sections.${i}.id`));

          return (
            <div key={i} id={t(`sections.${i}.id`) ?? ''} className={isLinkedToThisId ? 'highlight' : ''}>
              {t(`sections.${i}.title`, { defaultValue: '' }) !== '' && <h3>{t(`sections.${i}.title`)}</h3>}
              <section>
                {t(`sections.${i}.p`, { app_url: process.env.APP_URL, returnObjects: true }).map((par) => (
                  <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                ))}
              </section>
            </div>
          );
        })}
      </div>
    </Page>
  );
};
Agreement.getInitialProps = async () => ({
  namespacesRequired: ['agreement'],
});

export default withTranslation('agreement')(Agreement);
