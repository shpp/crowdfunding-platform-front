import { Instance } from './instance';

export const api = Instance({
  API_URL: `${process.env.API_URL}/api/v1/`,
  endpoints: {
    create_transaction: 'transactions/create',
    transactions: 'transactions/list',
    revoke_transaction: 'transactions/revoke',
    reaffirm_transaction: 'transactions/reaffirm',
    update_transaction: 'transactions/update',
    update_project: 'projects/update',
    create_project: 'projects/create',
    delete_project: 'projects/delete',
    publish_project: 'projects/publish',
    admin_projects: 'projects/admin-list',
    projects: 'projects/list',
    button: 'projects/button',
    list_subscriptions: 'orders/list-subscriptions',
    subscriptions: 'orders/subscriptions',
    unsubscribe: 'orders/unsubscribe',
    'donate-1': 'orders/shpp/donate',
    'donate-2': 'orders/shpp/donated',
    'project-1': 'projects/donate-step-1',
    'project-2': 'projects/donate-step-2',
  },
});

export default api;
