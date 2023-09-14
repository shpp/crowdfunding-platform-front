import { useTranslations } from 'next-intl';

import Page from '../components/layout/Page';

const Agreement = ({ messages }) => {
  const t = useTranslations('agreement');
  return (
    <Page>
      <div className="container">
        <h2>{t('title')}</h2>
        {messages.agreement.sections.map((section, i) => (
          <div key={i}>
            {section.title && <h3>{t(`sections.${i}.title`)}</h3>}
            <section>
              {section.p.map((_, j) => (
                <p dangerouslySetInnerHTML={{ __html: t.raw(`sections.${i}.p.${j}`).replaceAll(/\{app_url\}/g, process.env.NEXT_PUBLIC_APP_URL)}} key={`sections.${i}.p.${j}`} />
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
    props: {
      messages: {
        agreement: (await import(`../locales/${locale}/agreement.json`)).default,
        header: (await import(`../locales/${locale}/header.json`)).default,
        footer: (await import(`../locales/${locale}/footer.json`)).default,
      }
    }
  };
}

export const runtime = 'experimental-edge';

export default Agreement;
