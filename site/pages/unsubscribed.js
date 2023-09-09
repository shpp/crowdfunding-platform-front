import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../components/layout/Page';

const UnsubscribedPage = () => {
  const { t } = useTranslation('unsubscribed');
  return (
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
};

export async function getStaticProps({ locale }) {
  return {
    props: await serverSideTranslations(locale, ['unsubscribed', 'header', 'footer'])
  };
}

export const config = { runtime: process.env.RUNTIME };

export default UnsubscribedPage;
