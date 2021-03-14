import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INews, News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';

@Injectable({ providedIn: 'root' })
export class NewsResolve implements Resolve<INews> {
  constructor(private service: NewsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INews> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((news: HttpResponse<News>) => {
          if (news.body) {
            return of(news.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new News());
  }
}

export const newsRoute: Routes = [
  {
    path: '',
    component: NewsComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'amensystemApp.news.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NewsDetailComponent,
    resolve: {
      news: NewsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.news.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NewsUpdateComponent,
    resolve: {
      news: NewsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.news.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NewsUpdateComponent,
    resolve: {
      news: NewsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'amensystemApp.news.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
