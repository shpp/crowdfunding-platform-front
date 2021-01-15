/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { Component } from 'react';

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList,
} from 'recharts';

import Page from '../components/layout/Page';
import CardDonateWithoutProject from '../components/CardDonateWithoutProject';

import { flex, p, row, section } from '../utils/theme';
import { formatMoney, isLastThreeMonths, getAverageStats, isMobile, isTablet } from '../utils';
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

class Help extends Component {
  static async getInitialProps() {
    const { data: rawReport } = await axios.post(process.env.SHEETS_URL);
    const reports = rawReport
      .data
      .sort((a, b) => b.month - a.month)
      .sort((a, b) => b.year - a.year)
      .filter(({ month, year }) => isLastThreeMonths(new Date(year, month - 1, 1)));

    return {
      namespacesRequired: ['help'],
      reports
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      income: {},
      expenses: {},
      exchangeRate: {
        uk: { ...UAHRate },
        en: { ...UAHRate }
      },
    };
  }

  async componentDidMount() {
    const { data: currencies } = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

    const exchangeRate = currencies.find(({ ccy }) => ccy.toUpperCase() === 'USD');

    this.setState({
      exchangeRate: {
        uk: { ...UAHRate },
        en: exchangeRate
      },
      income: {
        uk: getAverageStats(this.props.reports, 'income', 1),
        en: getAverageStats(this.props.reports, 'income', exchangeRate.buy),
      },
      expenses: {
        en: getAverageStats(this.props.reports, 'expense', exchangeRate.buy),
        uk: getAverageStats(this.props.reports, 'expense', 1),
      },
    });
  }

  render() {
    const { t } = this.props;
    const exchangeRate = this.state.exchangeRate[i18n.language];
    const income = this.state.income[i18n.language];
    const expenses = this.state.expenses[i18n.language];

    const getTooltipContent = ({ payload = [] }) => {
      const { category } = (payload[0] || {}).payload || {};
      return (
        <div className="help-chart-tooltip">
          <p><strong>{t(`expense.${category}.title`)}</strong></p>
          <p>{t(`expense.${category}.description`)}</p>
          {/* <p><Link href="/reports"><a>фін. звіт</a></Link></p> */}
        </div>
      );
    };

    if (income && expenses) {
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
                          data={income}
                          dataKey="amount"
                          nameKey="category"
                          cx={isMobile() ? '35%' : isTablet() ? '25%' : '50%'}
                          innerRadius={isMobile() ? 20 : isTablet() ? 40 : 70}
                          outerRadius={isMobile() ? 30 : isTablet() ? 55 : 100}
                          paddingAngle={5}
                          animationBegin={0}
                          animationDuration={700}
                          label={
                            ({ category, percent }) => `${t(`income.${category}`)} — ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {income.map(coloredCell)}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [formatMoney(value, i18n.language, exchangeRate.ccy), t(`income.${name}`)]}
                        />
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
                        <YAxis domain={[0, exchangeRate.ccy === 'UAH' ? 50000 : 1750]} />
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
                            content={({ value }) => formatMoney(value, i18n.language, exchangeRate.ccy)}
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
