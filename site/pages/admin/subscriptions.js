import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'next/link';
import Page from '../../components/layout/admin/Page';
import api from '../../api';
import withAuth from '../../components/layout/admin/HOC/withAuth';

function getLocalDate(UTCDateString) {
  const date = new Date(UTCDateString);
  date.setHours(date.getHours() + 3);
  return date.toISOString().slice(0, -5).replace(/T/g, ' ');
}

/* eslint-disable no-console */
class Subscriptions extends Component {
 state = {
   subscriptions: []
 };

 async componentDidMount() {
   const { subscriptions } = await api.get('subscriptions');
   this.setState({
     subscriptions: subscriptions.sort((a, b) => {
       if (a.status === b.status) {
         return 0;
       }

       if (a.status === 'subscribed') {
         return -1;
       }

       return 1;
     })
   });
 }

 render() {
   return (
     <Page>
       <h1 className="text-center">Підписки</h1>
       <Table
         striped
         bordered
         hover
         size="sm"
       >
         <thead>
           <tr>
             <th>#</th>
             <th>Донатор</th>
             <th>Телефон</th>
             <th>Email</th>
             <th>Сума</th>
             <th>Статус</th>
             <th>Дата підписки</th>
           </tr>
         </thead>
         <tbody>
           { this.state.subscriptions && this.state.subscriptions.map((subscription, index) => (
             <Link
               key={subscription.id}
               href="/admin/subscription/[id]"
               as={`/admin/subscription/${subscription.id}`}
             >
               <tr key={subscription.id} style={{ cursor: 'pointer' }}>
                 <td>{ index + 1 }</td>
                 <td>{subscription.donator?.name} {subscription.donator?.surname}</td>
                 <td>{subscription.donator?.phone}</td>
                 <td>{subscription.donator?.email}</td>
                 <td>{subscription.amount} {subscription.currency}</td>
                 <td>{subscription.status}</td>
                 <td>{subscription.created_at ? getLocalDate(subscription.created_at) : ''}</td>

               </tr>
             </Link>

           ))}
         </tbody>
       </Table>
     </Page>
   );
 }
}

export default withAuth(Subscriptions);
