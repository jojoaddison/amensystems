import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductUpdateComponent } from './product-update.component';

<<<<<<< HEAD
export const productRoute: Routes = [
     {
        path: 'product-view',
        component: ProductComponent,
        data: {
            authorities: [],
            pageTitle: 'amensystemApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product',
        component: ProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product/:id',
        component: ProductDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
=======
@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
  constructor(private service: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((product: HttpResponse<Product>) => {
          if (product.body) {
            return of(product.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
>>>>>>> jhipster_upgrade
    }
    return of(new Product());
  }
}

export const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
