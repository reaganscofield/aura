import {
  DefaultPage,
  Users,
  Companies,
  SecurityAgentsJs,
  Panics,
  RequestPanics,
  Request,
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
    { path: 'request_panics', name: 'Request panics', component: RequestPanics },
    { path: 'request_panic', name: 'Request', component: Request },
  ],
};
