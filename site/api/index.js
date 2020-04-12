import { Instance } from './instance';

export const api = Instance({
  API_URL: `${process.env.API_URL}/api/v1/`,
  endpoints: {
    create_transaction: 'transactions/create',
    transactions: 'transactions/list',
    revoke_transaction: 'transactions/revoke',
    reaffirm_transaction: 'transactions/reaffirm',
    update_project: 'projects/update',
    create_project: 'projects/create',
    delete_project: 'projects/delete',
    publish_project: 'projects/publish',
    admin_projects: 'projects/admin-list',
    projects: 'projects/list',
    button: 'projects/button',
    pay: 'orders/shpp/donate',
  },
});

export default api;
