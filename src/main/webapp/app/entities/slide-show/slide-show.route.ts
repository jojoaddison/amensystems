import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISlideShow, SlideShow } from 'app/shared/model/slide-show.model';
import { SlideShowService } from './slide-show.service';
import { SlideShowComponent } from './slide-show.component';
import { SlideShowDetailComponent } from './slide-show-detail.component';
import { SlideShowUpdateComponent } from './slide-show-update.component';

@Injectable({ providedIn: 'root' })
export class SlideShowResolve implements Resolve<ISlideShow> {
  constructor(private service: SlideShowService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISlideShow> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((slideShow: HttpResponse<SlideShow>) => {
          if (slideShow.body) {
            return of(slideShow.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SlideShow());
  }
}

export const slideShowRoute: Routes = [
  {
    path: '',
    component: SlideShowComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slideShow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SlideShowDetailComponent,
    resolve: {
      slideShow: SlideShowResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slideShow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SlideShowUpdateComponent,
    resolve: {
      slideShow: SlideShowResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slideShow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SlideShowUpdateComponent,
    resolve: {
      slideShow: SlideShowResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.slideShow.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
