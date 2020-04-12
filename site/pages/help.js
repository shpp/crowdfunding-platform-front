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

import '../assets/styles/help.css';
import '../assets/styles/card.css';

const colors = [
  '#fe4a49', '#2ab7ca ', '#fed766',
  '#fe9c8f', '#feb2a8 ', '#fec8c1',
  '#fad9c1', '#f9caa7', '#ee4035',
  '#f37736', '#fdf498 ', '#7bc043',
  '#0392cf', '#f6abb6', '#03396c',
];

const expense = {
  оренда: {
    title: 'Оренда',
    description: 'Приміщення площею 360м2 у центрі міста',
  },
  комунальні: {
    title: 'Комунальні платежі',
    description: 'Опалення, електроенергія, водопостачання, інтернет тощо.',
  },
  побут: {
    title: 'Побутові витрати',
    description: 'Чай, печиво, поліграфія, ремонт, оренда серверів, тощо.',
  },
  зарплати: {
    title: 'Зарплати',
    description: 'Оплата праці 2 адміністраторів та 1 менеджера + податки',
  },
};

const getTooltipContent = ({ label }) => (
  <div className="help-chart-tooltip">
    <p><strong>{(expense[label] || {}).title}</strong></p>
    <p>{(expense[label] || {}).description}</p>
    {/* <p><Link href="/reports"><a>фін. звіт</a></Link></p> */}
  </div>
);

export default class Help extends Component {
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
    if (income && expenses) {
      const coloredCell = (_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
      return (
        <Page>
          <div style={{ ...flex }} className="help-container">
            <div className="help-text-block">
              <section style={{ ...flex, ...row, alignItems: 'start' }} className="help-intro">
                <div>
                  <h2>Привіт!</h2>
                  <p>Мене звати Рома, я програміст.</p>
                  <p>
                    Я заснував <a href="https://programming.kr.ua" rel="noopener noreferrer" target="_blank">Ш++</a>
                    &nbsp;та <a href="https://kowo.me" rel="noopener noreferrer" target="_blank">KOWO</a>
                    &nbsp;щоб розвивати ІТ-спільноту та волонтерство у Кропивницькому.
                  </p>
                </div>
                <img src="/roma.jpg" alt="Roman Shmelev" />
              </section>
              <section>
                <p>
                  Вже 5 років ми з друзями навчаємо програмуванню усіх бажаючих і
                  надаємо майданчик для соціальних ініціатив міста. Безкоштовно.
                </p>
                <p>
                  Ми будуємо казку, показуючи людям, як можна допомагати
                  іншим, не думаючи про матеріальну вигоду.
                </p>
                <p>
                  За кулісами магії немає &mdash; Ш++ та КОВО існують завдяки людям, для
                  яких ці проекти є особливими. Ще половину бюджету я наповнюю власноруч, зі своєї зарплатні (це важко).
                </p>
                <div className="help-chart-wrapper">
                  <div className="help-chart-container">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
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
                            ({ category, percent }) => `${category} — ${(percent * 100).toFixed(1)}%`
                          }
                        >
                          {income.map(coloredCell)}
                        </Pie>
                        <Tooltip formatter={(value) => formatMoney(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <p><small><em>(середні щомісячні надходження Ш++ та КОВО)</em></small></p>
                <p>
                  Ця сторінка існує щоб змінити поточний стан речей &mdash;&nbsp;
                  <strong>Ш++ та КОВО потребують стабільності та зросту</strong>. Це
                  стане можливим лише якщо
                  невеликими щомісячними внесками нас підтримуватиме велика кількість людей.
                </p>
                <p>
                  Наша поточна фінансова ціль &mdash; <strong>вийти на самоокуповність</strong>. Це
                  означає щомісяця не перейматись  про покриття наших базових витрат.
                </p>
                <div className="help-chart-wrapper">
                  <div className="help-chart-container">
                    <ResponsiveContainer>
                      <BarChart data={expenses}>
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
                          <LabelList content={({ value }) => formatMoney(value)} position="top" />
                          {expenses.map(coloredCell)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <p><small><em>(середні щомісячні витрати Ш++ та КОВО)</em></small></p>
                <p>
                  Коли ми досягнемо самоокупованості, замість постійного пошуку грошей ми зможемо присвячувати
                  більше душі та свого часу для розвитку Ш++ та КОВО, вдосконалювати
                  навчальні процеси, реалізовувати більше соціальних проектів для міста.
                </p>
                <p>
                  <em>Якщо вам потрібна додаткова інформація про Ш++, КОВО, нашу діяльність, звертайтесь до <a href="https://fb.me/rshmelev">мене</a>.</em>
                </p>
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
