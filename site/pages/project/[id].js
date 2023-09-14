import { withRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import api from '../../fetch';

import Page from '../../components/layout/Page';
import ProgressBar from '../../components/ProgressBar';
import ButtonDonate from '../../components/ButtonDonate';

export async function getStaticProps({ locale, params: { id } }) {
  console.log({id})
  return {
    props: {
      messages: {
        common: (await import(`../../locales/${locale}/common.json`)).default,
        header: (await import(`../../locales/${locale}/header.json`)).default,
        footer: (await import(`../../locales/${locale}/footer.json`)).default,
      },
      ...await api.request(`projects/${id}`, 'get'),
      currency: (await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).data.find(({ ccy }) => ccy.toUpperCase() === 'USD')
    }
  };
}

export async function getStaticPaths() {
  const { projects } = await api.get('projects');
  console.log('length' + projects.length)
  const paths = projects.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return { paths, fallback: false };
}

const ProjectPage = ({ project, router, currency }) => {
  // console.log({project})
  const t = useTranslations('common');
  const locale = useLocale();
  const lang = locale || 'uk';
  const selectedCurrency = lang === 'en' ? currency : { ccy: 'UAH', buy: 1 };
  const projectURL = process.env.NEXT_PUBLIC_APP_URL + router.asPath;
  // TODO: render NEXT SEO here with translations
  return (
    <Page>
      <NextSeo
        title={`${project[`name_${lang}`]} | Збір коштів`}
        description={project[`short_description_${lang}`]}
        canonical={projectURL}
        openGraph={{
          url: projectURL,
          title: `${project[`name_${lang}`]} | Збір коштів`,
          description: project[`short_description_${lang}`],
          images: [
            { url: `${process.env.NEXT_PUBLIC_APP_URL}/api/getImage?url=${encodeURI(project.image)}` },
            { url: `${process.env.NEXT_PUBLIC_APP_URL}/cover-image.jpg` }
          ],
          site_name: 'Підтримай++ - спільнокошт',
        }}
      />
      <Head>
        <title>{project[`name_${lang}`]} | Ш++ збір коштів</title>
      </Head>
      <div className="project-image-wrapper" style={{ backgroundImage: `url(${project.image})` }} />
      <div className="container project-info big">
        <div>
          <h1>{project[`name_${lang}`]}&nbsp;</h1>
          <span className="text-green">{project.completed ? `(${t('funded')})` : ''}</span>
          <span className="creation-date">{new Date(project.created_at).toLocaleDateString(lang)}</span>
        </div>
        <section>
          <div dangerouslySetInnerHTML={{ __html: project[`description_${lang}`] }} key={lang} />
        </section>
        <ProgressBar
          amount={project.amount}
          funded={project.amount_funded}
          currency={selectedCurrency}
        />
        {project.completed && project[`actual_spendings_${lang}`] && project[`actual_spendings_${lang}`].length && (
          <section>
            <h2>{t('expenses.actual.title')}:</h2>
            <div dangerouslySetInnerHTML={{ __html: project[`actual_spendings_${lang}`] }} key={lang} />
          </section>
        )}
        {!project.completed && (<ButtonDonate project_id={project.id}/>)}
      </div>
    </Page>
  );
};

// export const runtime = 'experimental-edge';

export default withRouter(ProjectPage);
