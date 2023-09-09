import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ProgressBar from './ProgressBar';
import Check from '../assets/icon/check.svg';
import { formatDate } from '../utils';
import ButtonDonate from './ButtonDonate';
import { flex, column, p, grow } from '../utils/theme';

const CardProject = ({ project, currency }) => {
  const { t, i18n } = useTranslation('common');

  return (
    <div style={{ ...flex, ...column, ...grow }}>
      {project.completed && <div className="project-completed"><Check style={{ verticalAlign: 'bottom' }} /> &nbsp;{t('completed')}</div> }
      <Link
        href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
        as={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/${project.id}`}
      >
        <img
          src={project.image}
          alt=""
          className="project-image"
        />
      </Link>
      <div className="project-info">
        <Link
          href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
          as={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/${project.id}`}
          className="no-underline"
        >
          <h3 className="project-title">
            {project[`name_${i18n.language}`]}
          </h3>
        </Link>
        <div style={grow}>
          <p style={p}>{project[`short_description_${i18n.language}`]}</p>
          <p style={p}>
            <Link
              href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
              as={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/${project.id}`}
            >
              {t('details')}
            </Link>
          </p>
        </div>
        {!project.completed && (<ButtonDonate project_id={project.id} />)}

        <ProgressBar
          amount={project.amount}
          funded={project.amount_funded}
          currency={currency}
        />

        <div className="text-small">
          {t('createdAt')} {formatDate(project.created_at, i18n.language)}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
