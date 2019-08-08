import {
  DefaultPage,
  Users,
  Companies,
  SecurityAgentsJs,
  Panics,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'users', name: 'Users', component: Users },
    { path: 'companies', name: 'Companies', component: Companies },
    { path: 'security_agents', name: 'Security agents js', component: SecurityAgentsJs },
    { path: 'panics', name: 'Panics', component: Panics },
  ],
};
