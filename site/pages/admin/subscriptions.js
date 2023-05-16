import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'next/link';
import Page from '../../components/layout/admin/Page';
import api from '../../api';
import withAuth from '../../components/layout/admin/HOC/withAuth';

/* eslint-disable no-console */
class Subscriptions extends Component {
 state = {
   subscriptions: []
 };

 async componentDidMount() {
   const { subscriptions } = await api.get('subscriptions');
   this.setState({ subscriptions });
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
             <th>Проект</th>
             <th>Ім`я донатора</th>
             <th>Телефон</th>
             <th>Email</th>
             <th>Сума</th>
             <th> </th>
           </tr>
         </thead>
         <tbody>
           { this.state.subscriptions && this.state.subscriptions.map((subscription, index) => (

             <tr key={subscription.id}>
               <td>{ index + 1 }</td>
               <td>{subscription.project.name}</td>
               <td>{subscription.donator?.name} {subscription.donator?.surname}</td>
               <td>{subscription.donator?.phone}</td>
               <td>{subscription.donator?.email}</td>
               <td>{subscription.amount} {subscription.currency}</td>
               <td className="text-center">
                 <Link
                   key={subscription.id}
                   href="/admin/subscription/[id]/unsubscribe"
                   as={`/admin/subscription/${subscription.id}/unsubscribe`}
                 >
                   Відмінити підписку
                 </Link>
               </td>
             </tr>

           ))}
         </tbody>
       </Table>
     </Page>
   );
 }
}

export default withAuth(Subscriptions);
