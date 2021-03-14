import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDigitalAsset, DigitalAsset } from 'app/shared/model/digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';
import { DigitalAssetComponent } from './digital-asset.component';
import { DigitalAssetDetailComponent } from './digital-asset-detail.component';
import { DigitalAssetUpdateComponent } from './digital-asset-update.component';

@Injectable({ providedIn: 'root' })
export class DigitalAssetResolve implements Resolve<IDigitalAsset> {
  constructor(private service: DigitalAssetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDigitalAsset> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((digitalAsset: HttpResponse<DigitalAsset>) => {
          if (digitalAsset.body) {
            return of(digitalAsset.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DigitalAsset());
  }
}

export const digitalAssetRoute: Routes = [
  {
    path: '',
    component: DigitalAssetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.digitalAsset.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DigitalAssetDetailComponent,
    resolve: {
      digitalAsset: DigitalAssetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.digitalAsset.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DigitalAssetUpdateComponent,
    resolve: {
      digitalAsset: DigitalAssetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.digitalAsset.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DigitalAssetUpdateComponent,
    resolve: {
      digitalAsset: DigitalAssetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.digitalAsset.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
