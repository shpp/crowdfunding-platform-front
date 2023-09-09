/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList, Legend,
} from 'recharts';

import { useTranslation } from 'next-i18next';
import Page from '../components/layout/Page';
import CardDonateWithoutProject from '../components/CardDonateWithoutProject';
import api from '../fetch';
import { flex, row } from '../utils/theme';
import { formatMoney, isMobile, isTablet } from '../utils';

const colors = [
  '#fe4a49', '#2ab7ca ', '#fed766',
  '#fe9c8f', '#feb2a8 ', '#fec8c1',
  '#fad9c1', '#f9caa7', '#ee4035',
  '#f37736', '#fdf498 ', '#7bc043',
  '#0392cf', '#f6abb6', '#03396c',
];

const UAHRate = {
  ccy: 'UAH',
  buy: 1
};
const USDRate = {
  ccy: 'USD',
  buy: '39.75000'
};

const Help = ({ exchangeRate, incomes, expenses, subscriptions }) => {
  const { t, i18n } = useTranslation('help');
  const locale = i18n.language;
  const precision = locale === 'uk' ? 10000 : 500;
  const expensesMaxValue = Math.ceil(Math.max(...expenses.map((e) => e[`amount-${locale}`])) / precision) * precision;

  const getTooltipContent = ({ payload = [] }) => {
    const { category } = (payload[0] || {}).payload || {};
    return (
      <div className="help-chart-tooltip">
        <p><strong>{t(`expense.${category}.title`)}</strong></p>
        <p>{t(`expense.${category}.description`)}</p>
      </div>
    );
  };

  const coloredCell = (_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;

  return (
    <Page>
      <div style={{ ...flex }} className="help-container">
        <div className="help-text-block">
          <section
            style={{
              ...flex,
              ...row,
              alignItems: 'start'
            }}
            className="help-intro"
          >
            <div>
              <h2>{t('text.title')}</h2>
              {t('text.p1', { returnObjects: true })
                .map((par) => (
                  <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                ))}
            </div>
            <img src="/roma-2.jpg" alt="Roman Shmelev" />
          </section>
          <section>
            {t('text.p2', { returnObjects: true })
              .map((par) => (
                <p key={par}>{par}</p>
              ))}
            {incomes
            && (
            <div className="help-chart-wrapper">
              <div className="help-chart-container">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      isAnimationActive={false}
                      data={incomes}
                      dataKey="amount"
                      nameKey="category"
                      cx={isMobile() ? '25%' : isTablet() ? '45%' : '50%'}
                      innerRadius={isMobile() ? 45 : isTablet() ? 40 : 65}
                      outerRadius={isMobile() ? 60 : isTablet() ? 55 : 90}
                      paddingAngle={5}
                      animationBegin={0}
                      animationDuration={700}
                      label={
                        ({ category, percent }) => (isMobile()
                          ? `${(percent * 100).toFixed(1)}%`
                          : `${t(`income.${category}`)}\n — ${(percent * 100).toFixed(1)}%`)
                      }
                    >
                      {incomes.map(coloredCell)}
                    </Pie>
                    {
                      isMobile()
                        ? (
                          <Legend
                            formatter={(value) => `${t(`income.${value}`)}`}
                            layout="vertical"
                            verticalAlign="top"
                          />
                        )
                        : null
                    }
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            )}
            {t('text.p3', { returnObjects: true })
              .map((par) => (
                <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
              ))}
            {expenses
            && (
            <div className="help-chart-wrapper">
              <div className="help-chart-container">
                <ResponsiveContainer>
                  <BarChart data={expenses} key={`amount-${locale}`}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={(v) => t(`expense.${v.category}.shortTitle`)} />
                    <YAxis domain={[0, expensesMaxValue]} />
                    <Tooltip
                      coordinate={{
                        x: 100,
                        y: 140
                      }}
                      content={getTooltipContent}
                      allowEscapeViewBox={{
                        x: true,
                        y: false
                      }}
                      wrapperStyle={{
                        pointerEvents: 'all',
                        zIndex: 1
                      }}
                    />
                    <Bar dataKey={`amount-${locale}`} isAnimationActive={false}>
                      <LabelList
                        content={({ value }) => formatMoney(value, locale)}
                      />
                      {expenses.map(coloredCell)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            )}
            {t('text.p4', { returnObjects: true })
              .map((par) => (
                <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
              ))}
          </section>
        </div>
        <aside>
          <CardDonateWithoutProject exchangeRate={exchangeRate[locale]} subscriptions={subscriptions} />
        </aside>
      </div>
    </Page>
  );
};

export async function getServerSideProps({ locale }) {
  const { data } = await axios.post(process.env.SHEETS_URL);

  const exchangeRate = {
    uk: data.currencies.find(({ ccy }) => ccy.toUpperCase() === 'UAH') ?? UAHRate,
    en: data.currencies.find(({ ccy }) => ccy.toUpperCase() === 'USD') ?? USDRate
  };

  return {
    props: {
      ...await serverSideTranslations(locale, ['help', 'header', 'footer']),
      incomes: Object.entries(data.incomes).map(([key, value]) => ({
        category: key,
        amount: value * 100
      })),
      expenses: Object.entries(data.expenses).map(([key, value]) => ({
        category: key,
        'amount-uk': Math.round(value / exchangeRate.uk.buy ?? 1),
        'amount-en': Math.round(value / exchangeRate.en.buy ?? 1),
      })).sort((a, b) => b.amount - a.amount),
      exchangeRate,
      subscriptions: await api.get('list_subscriptions')
    }
  };
}

export const config = { runtime: process.env.RUNTIME };

export default Help;
