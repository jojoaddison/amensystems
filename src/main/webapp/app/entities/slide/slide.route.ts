import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISlide, Slide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';
import { SlideComponent } from './slide.component';
import { SlideDetailComponent } from './slide-detail.component';
import { SlideUpdateComponent } from './slide-update.component';

@Injectable({ providedIn: 'root' })
export class SlideResolve implements Resolve<ISlide> {
  constructor(private service: SlideService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISlide> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((slide: HttpResponse<Slide>) => {
          if (slide.body) {
            return of(slide.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Slide());
  }
}

export const slideRoute: Routes = [
  {
    path: '',
    component: SlideComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slide.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SlideDetailComponent,
    resolve: {
      slide: SlideResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slide.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SlideUpdateComponent,
    resolve: {
      slide: SlideResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slide.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SlideUpdateComponent,
    resolve: {
      slide: SlideResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slide.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
