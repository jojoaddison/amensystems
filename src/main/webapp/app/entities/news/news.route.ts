import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsPopupComponent } from './news-dialog.component';
import { NewsDeletePopupComponent } from './news-delete-dialog.component';

@Injectable()
export class NewsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const newsRoute: Routes = [
    {
        path: 'news-view',
        component: NewsComponent,
        resolve: {
            'pagingParams': NewsResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'news',
        component: NewsComponent,
        resolve: {
            'pagingParams': NewsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'news/:id',
        component: NewsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const newsPopupRoute: Routes = [
    {
        path: 'news-new',
        component: NewsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'news/:id/edit',
        component: NewsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'news/:id/delete',
        component: NewsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
