import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICategory, Category } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category.component';
import { CategoryViewComponent } from './category-view.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryUpdateComponent } from './category-update.component';

@Injectable({ providedIn: 'root' })
export class CategoryResolve implements Resolve<ICategory> {
  constructor(private service: CategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((category: HttpResponse<Category>) => {
          if (category.body) {
            return of(category.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Category());
  }
}

export const categoryRoute: Routes = [
<<<<<<< HEAD
    {
        path: 'category',
        component: CategoryComponent,
        resolve: {
            'pagingParams': CategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-view/:name',
        component: CategoryViewComponent,
        resolve: {
            'pagingParams': CategoryResolvePagingParams
        },
        data: {
            pageTitle: 'amensystemApp.category.home.title'
        }
    },
    {
        path: 'category/:id',
        component: CategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-new',
        component: CategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
=======
  {
    path: '',
    component: CategoryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'amensystemApp.category.home.title',
>>>>>>> jhipster_upgrade
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategoryDetailComponent,
    resolve: {
      category: CategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.category.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategoryUpdateComponent,
    resolve: {
      category: CategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.category.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategoryUpdateComponent,
    resolve: {
      category: CategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.category.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
