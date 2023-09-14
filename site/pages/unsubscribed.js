import { useTranslations } from 'next-intl';
import Page from '../components/layout/Page';

const UnsubscribedPage = ({ messages }) => {
  const t = useTranslations('unsubscribed');
  return (
    <Page>
      <div className="container">
        {messages.unsubscribed.sections.map((section, i) => (
          <div key={i}>
            <h3>{t(`sections.${i}.title`)}</h3>
            <section>
              {section.p.map((_, j) => (
                <p dangerouslySetInnerHTML={{ __html: t.raw(`sections.${i}.p.${j}`) }} key={`sections.${i}.p.${j}`} />
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
        unsubscribed: (await import(`../locales/${locale}/unsubscribed.json`)).default,
        header: (await import(`../locales/${locale}/header.json`)).default,
        footer: (await import(`../locales/${locale}/footer.json`)).default,
      },
    }
  };
}

export const runtime = 'experimental-edge';

export default UnsubscribedPage;
