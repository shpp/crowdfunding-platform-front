import { Component } from 'react';
import { withRouter } from 'next/router';
import api from '../../../api';

class AddProject extends Component {
  async componentDidMount() {
    // eslint-disable-next-line camelcase
    const { project_id } = await api.post('create_project', { name: 'новий проект' });
    // eslint-disable-next-line camelcase
    await this.props.router.push('/admin/project/edit/[id]', `/admin/project/edit/${project_id}`);
  }

  render() {
    return <div />;
  }
}

export default withRouter(AddProject);
