import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SlideShowComponent } from './slide-show.component';
import { SlideShowDetailComponent } from './slide-show-detail.component';
import { SlideShowPopupComponent } from './slide-show-dialog.component';
import { SlideShowDeletePopupComponent } from './slide-show-delete-dialog.component';

export const slideShowRoute: Routes = [
    {
        path: 'slide-show',
        component: SlideShowComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slideShow.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'slide-show/:id',
        component: SlideShowDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slideShow.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const slideShowPopupRoute: Routes = [
    {
        path: 'slide-show-new',
        component: SlideShowPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slideShow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide-show/:id/edit',
        component: SlideShowPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slideShow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide-show/:id/delete',
        component: SlideShowDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slideShow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
