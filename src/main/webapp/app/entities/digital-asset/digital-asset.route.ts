import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DigitalAssetComponent } from './digital-asset.component';
import { DigitalAssetDetailComponent } from './digital-asset-detail.component';
import { DigitalAssetPopupComponent } from './digital-asset-dialog.component';
import { DigitalAssetDeletePopupComponent } from './digital-asset-delete-dialog.component';

export const digitalAssetRoute: Routes = [
    {
        path: 'digital-asset',
        component: DigitalAssetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.digitalAsset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'digital-asset/:id',
        component: DigitalAssetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.digitalAsset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const digitalAssetPopupRoute: Routes = [
    {
        path: 'digital-asset-new',
        component: DigitalAssetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.digitalAsset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'digital-asset/:id/edit',
        component: DigitalAssetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.digitalAsset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'digital-asset/:id/delete',
        component: DigitalAssetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'amensystemApp.digitalAsset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
