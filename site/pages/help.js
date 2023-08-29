/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { Component } from 'react';

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList, Legend,
} from 'recharts';

import Page from '../components/layout/Page';
import CardDonateWithoutProject from '../components/CardDonateWithoutProject';

import { flex, row } from '../utils/theme';
import { formatMoney, isMobile, isTablet } from '../utils';
import { withTranslation, i18n } from '../utils/translations';

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

class Help extends Component {
  static async getInitialProps(props) {
    const locale = props.req?.locale ?? 'uk';
    const { data } = await axios.post(process.env.SHEETS_URL);

    const exchangeRate = {
      uk: UAHRate,
      en: data.currencies.find(({ ccy }) => ccy.toUpperCase() === 'USD') ?? USDRate
    };

    return {
      namespacesRequired: ['help'],
      incomes: Object.entries(data.incomes).map(([key, value]) => ({
        category: key,
        amount: value / exchangeRate[locale].buy ?? 1
      })),
      expenses: Object.entries(data.expenses).map(([key, value]) => ({
        category: key,
        amount: value / exchangeRate[locale].buy ?? 1
      })).sort((a, b) => b.amount - a.amount),
      exchangeRate
    };
  }


  render() {
    const { t, exchangeRate, incomes, expenses } = this.props;

    const getTooltipContent = ({ payload = [] }) => {
      const { category } = (payload[0] || {}).payload || {};
      return (
        <div className="help-chart-tooltip">
          <p><strong>{t(`expense.${category}.title`)}</strong></p>
          <p>{t(`expense.${category}.description`)}</p>
        </div>
      );
    };

    if (incomes && expenses) {
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
                {t('text.p3', { returnObjects: true })
                  .map((par) => (
                    <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                  ))}
                <div className="help-chart-wrapper">
                  <div className="help-chart-container">
                    <ResponsiveContainer>
                      <BarChart data={expenses} key={i18n.language}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={(v) => t(`expense.${v.category}.shortTitle`)} />
                        <YAxis domain={[0, i18n.language === 'uk' ? 50000 : 1600]} />
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
                        <Bar dataKey="amount" isAnimationActive={false}>
                          <LabelList
                            content={({ value }) => formatMoney(value, i18n.language)}
                            position="top"
                          />
                          {expenses.map(coloredCell)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {t('text.p4', { returnObjects: true })
                  .map((par) => (
                    <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                  ))}
              </section>
            </div>
            <aside>
              <CardDonateWithoutProject exchangeRate={exchangeRate} />
            </aside>
          </div>
        </Page>
      );
    }
    return <div />;
  }
}

export default withTranslation('help')(Help);
