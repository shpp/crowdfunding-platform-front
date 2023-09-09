import { Instance } from './instance';

export const api = Instance({
  API_URL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  endpoints: {
    create_transaction: 'admin/transactions/create',
    transactions: 'admin/transactions/list',
    revoke_transaction: 'admin/transactions/revoke',
    reaffirm_transaction: 'admin/transactions/reaffirm',
    update_transaction: 'admin/transactions/update',
    update_project: 'admin/projects/update',
    create_project: 'admin/projects/create',
    delete_project: 'admin/projects/delete',
    publish_project: 'admin/projects/publish',
    admin_projects: 'admin/projects/list',
    projects: 'projects/list',
    button: 'projects/button',
    list_subscriptions: 'orders/list-subscriptions',
    subscriptions: 'admin/orders/subscriptions',
    unsubscribe: 'admin/orders/unsubscribe',
    'donate-1': 'orders/shpp/donate',
    'donate-2': 'orders/shpp/donated',
    'project-1': 'projects/donate-step-1',
    'project-2': 'projects/donate-step-2',
  },
});

export default api;
