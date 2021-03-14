import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HomeComponent } from './home.component';
import { HomeDetailComponent } from './home-detail.component';
import { HomePopupComponent } from './home-dialog.component';
import { HomeDeletePopupComponent } from './home-delete-dialog.component';

export const homeRoute: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.home.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'home/:id',
        component: HomeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.home.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const homePopupRoute: Routes = [
    {
        path: 'home-new',
        component: HomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.home.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'home/:id/edit',
        component: HomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.home.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'home/:id/delete',
        component: HomeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.home.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
