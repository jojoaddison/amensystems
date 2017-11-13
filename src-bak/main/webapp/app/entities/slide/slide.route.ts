import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SlideComponent } from './slide.component';
import { SlideDetailComponent } from './slide-detail.component';
import { SlidePopupComponent } from './slide-dialog.component';
import { SlideDeletePopupComponent } from './slide-delete-dialog.component';

export const slideRoute: Routes = [
    {
        path: 'slide',
        component: SlideComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slide.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'slide/:id',
        component: SlideDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slide.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const slidePopupRoute: Routes = [
    {
        path: 'slide-new',
        component: SlidePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slide.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide/:id/edit',
        component: SlidePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slide.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide/:id/delete',
        component: SlideDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.slide.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
