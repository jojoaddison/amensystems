import { Route } from '@angular/router';

import { RegisterComponent } from './register.component';

<<<<<<< HEAD
export const registerRoute: Route = <any> {
    path: 'register',
    component: RegisterComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'register.title'
    }
=======
export const registerRoute: Route = {
  path: 'register',
  component: RegisterComponent,
  data: {
    authorities: [],
    pageTitle: 'register.title',
  },
>>>>>>> jhipster_upgrade
};
