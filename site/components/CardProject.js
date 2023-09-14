import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import ProgressBar from './ProgressBar';
import Check from '../assets/icon/check.svg';
import { formatDate } from '../utils';
import ButtonDonate from './ButtonDonate';
import { flex, column, p, grow } from '../utils/theme';

const CardProject = ({ project, currency }) => {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <div style={{ ...flex, ...column, ...grow }}>
      {project.completed && <div className="project-completed"><Check style={{ verticalAlign: 'bottom' }} /> &nbsp;{t('completed')}</div> }
      <Link
        href="/project/[id]"
        as={`/project/${project.id}`}
        locale={locale}
      >
        <img
          src={project.image}
          alt=""
          className="project-image"
        />
      </Link>
      <div className="project-info">
        <Link
          href="/project/[id]"
          as={`/project/${project.id}`}
          locale={locale}
          className="no-underline"
        >
          <h3 className="project-title">
            {project[`name_${locale}`]}
          </h3>
        </Link>
        <div style={grow}>
          <p style={p}>{project[`short_description_${locale}`]}</p>
          <p style={p}>
            <Link
              href="/project/[id]"
              as={`/project/${project.id}`}
              locale={locale}
            >
              {t('details')}
            </Link>
          </p>
        </div>
        {!project.completed && (<ButtonDonate project_id={project.id}/>)}

        <ProgressBar
          amount={project.amount}
          funded={project.amount_funded}
          currency={currency}
        />

        <div className="text-small">
          {t('createdAt')} {formatDate(project.created_at, locale)}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
