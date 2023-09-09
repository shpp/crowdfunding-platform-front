import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Page from '../components/layout/Page';

const Agreement = () => {
  const { t } = useTranslation('agreement');
  return (
    <Page>
      <div className="container">
        <h2>{t('title')}</h2>
        {t('sections', { returnObjects: true }).map((_, i) => (
          <div key={i}>
            {t(`sections.${i}.title`, { defaultValue: '' }) !== '' && <h3>{t(`sections.${i}.title`)}</h3>}
            <section>
              {t(`sections.${i}.p`, { app_url: process.env.NEXT_PUBLIC_APP_URL, returnObjects: true }).map((par) => (
                <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
              ))}
            </section>
          </div>
        ))}
      </div>
    </Page>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: await serverSideTranslations(locale, ['agreement', 'header', 'footer'])
  };
}

export const runtime = process.env.RUNTIME;

export default Agreement;
