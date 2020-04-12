/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import Papa from 'papaparse';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList,
} from 'recharts';

import Page from '../layout/Page';
import CardDonateWithoutProject from '../components/CardDonateWithoutProject';

import { flex, p, row, section } from '../theme/utils';
import { formatMoney, isLastThreeMonths, getAverageStats, isMobile, isTablet } from '../utils';
import { withTranslation, i18n } from '../utils/translations';

import '../assets/styles/help.css';
import '../assets/styles/card.css';

const colors = [
  '#fe4a49', '#2ab7ca ', '#fed766',
  '#fe9c8f', '#feb2a8 ', '#fec8c1',
  '#fad9c1', '#f9caa7', '#ee4035',
  '#f37736', '#fdf498 ', '#7bc043',
  '#0392cf', '#f6abb6', '#03396c',
];

class Help extends Component {
  static getInitialProps() {
    return {
      namespacesRequired: ['help'],
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      income: null,
      expenses: null
    };
  }

  async componentDidMount() {
    const data = await (fetch('/report.csv').then((res) => res.text()));

    const reports = Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    })
      .data
      .sort((a, b) => b.month - a.month)
      .sort((a, b) => b.year - a.year)
      .filter(({ month, year }) => isLastThreeMonths(new Date(year, month - 1, 1)));

    this.setState({
      income: getAverageStats(reports, 'income'),
      expenses: getAverageStats(reports, 'expense')
    });
  }

  render() {
    const { income, expenses } = this.state;
    const { t } = this.props;

    const getTooltipContent = ({ label }) => (
      <div className="help-chart-tooltip">
        <p><strong>{t(`expense.${label}.title`)}</strong></p>
        <p>{t(`expense.${label}.description`)}</p>
        {/* <p><Link href="/reports"><a>фін. звіт</a></Link></p> */}
      </div>
    );

    if (income && expenses) {
      const coloredCell = (_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
      return (
        <Page>
          <div style={{ ...flex }} className="help-container">
            <div className="help-text-block">
              <section style={{ ...flex, ...row, alignItems: 'start' }} className="help-intro">
                <div>
                  <h2>{t('text.title')}</h2>
                  {t('text.p1', { returnObjects: true }).map((par) => (
                    <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                  ))}
                </div>
                <img src="/roma.jpg" alt="Roman Shmelev" />
              </section>
              <section>
                {t('text.p2', { returnObjects: true }).map((par) => (
                  <p key={par}>{par}</p>
                ))}
                <div className="help-chart-wrapper">
                  <div className="help-chart-container">
                    <ResponsiveContainer>
                      <PieChart key={i18n.language}>
                        <Pie
                          key={i18n.language}
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
                        <Tooltip formatter={(value, name) => [formatMoney(value, i18n.language), t(`income.${name}`)]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {t('text.p3', { returnObjects: true }).map((par) => (
                  <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                ))}
                <div className="help-chart-wrapper">
                  <div className="help-chart-container">
                    <ResponsiveContainer>
                      <BarChart data={expenses} key={i18n.language}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis domain={[0, 40000]} />
                        <Tooltip
                          coordinate={{ x: 100, y: 140 }}
                          content={getTooltipContent}
                          allowEscapeViewBox={{ x: true, y: false }}
                          wrapperStyle={{ pointerEvents: 'all', zIndex: 1 }}
                        />
                        <Bar dataKey="amount">
                          <LabelList content={({ value }) => formatMoney(value, i18n.language)} position="top" />
                          {expenses.map(coloredCell)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {t('text.p4', { returnObjects: true }).map((par) => (
                  <p dangerouslySetInnerHTML={{ __html: par }} key={par} />
                ))}
              </section>
            </div>
            <aside>
              <CardDonateWithoutProject />
            </aside>
          </div>
        </Page>
      );
    }
    return <div />;
  }
}

export default withTranslation('help')(Help);
