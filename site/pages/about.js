import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Page from '../components/layout/Page';

const AboutPage = () => {
  const { t } = useTranslation('about');
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
    props: await serverSideTranslations(locale, ['about', 'header', 'footer'])
  };
}

export const runtime = 'experimental-edge';

export default AboutPage;
