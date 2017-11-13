import { Route } from '@angular/router';

import { RegisterComponent } from './register.component';

export const registerRoute: Route = <any> {
    path: 'register',
    component: RegisterComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'register.title'
    }
};
