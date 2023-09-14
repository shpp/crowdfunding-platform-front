import { withRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import api from '../fetch';
import Page from '../components/layout/Page';
import CardProject from '../components/CardProject';
import { grow, p } from '../utils/theme';
import ProgressBar from '../components/ProgressBar';

const HomePage = ({ currency, projects, messages }) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const livelihood = projects.find(({ slug }) => slug === 'shpp-kowo');
  const selectedCurrency = locale === 'en' ? currency : { ccy: 'UAH', buy: 1 };
  return (
    <Page>
      <div className="homepage">
        {
          livelihood && (
          <div className="item">
            <div className="card" style={{ padding: '20px' }}>
              <Link href="/help" className="no-underline">
                <h3 className="project-title">
                  {t('supportCard.title')}
                </h3>
              </Link>
              {messages.common.supportCard.p
                .map((_, i) => (
                  <p dangerouslySetInnerHTML={{ __html: t.raw(`supportCard.p.${i}`) }} key={`supportCard.p.${i}`} style={p} />
                ))}
              <p style={p}><Link href="/help">{t('details')}</Link></p>
              <div style={grow} />
              <div className="button-wrapper">
                <Link href="/help">
                  <button className="button-primary" type="button">
                    {t('support')}
                  </button>
                </Link>
              </div>
              <ProgressBar
                amount={livelihood.amount}
                funded={livelihood.this_month_funded}
                currency={selectedCurrency}
              />
              <div className="text-small">
                {t('supportCard.small')}
              </div>
            </div>
          </div>
          )
        }
        {projects
          .filter(({ state }) => state === 'published')
          .map((project) => (
            <div key={project.id} className="card item">
              <CardProject project={project} currency={selectedCurrency} />
            </div>
          ))}
      </div>
    </Page>
  );
};

export async function getServerSideProps({ locale, query }) {
  const { filter } = query ?? {};
  const getSortedProjects = (projects = []) => (filter === 'completed'
    ? projects.filter((project) => project.completed)
    : projects).sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  return {
    props: {
      messages: {
        help: (await import(`../locales/${locale}/help.json`)).default,
        common: (await import(`../locales/${locale}/common.json`)).default,
        header: (await import(`../locales/${locale}/header.json`)).default,
        footer: (await import(`../locales/${locale}/footer.json`)).default,
      },
      projects: getSortedProjects((await api.get('projects')).projects),
      currency: (await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).data.find(({ ccy }) => ccy.toUpperCase() === 'USD')
    }
  };
}

export const runtime = 'experimental-edge';

export default withRouter(HomePage);
