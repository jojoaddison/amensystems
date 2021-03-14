import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmensystemSharedModule } from 'app/shared/shared.module';
import { DigitalAssetComponent } from './digital-asset.component';
import { DigitalAssetDetailComponent } from './digital-asset-detail.component';
import { DigitalAssetUpdateComponent } from './digital-asset-update.component';
import { DigitalAssetDeleteDialogComponent } from './digital-asset-delete-dialog.component';
import { digitalAssetRoute } from './digital-asset.route';

@NgModule({
  imports: [AmensystemSharedModule, RouterModule.forChild(digitalAssetRoute)],
  declarations: [DigitalAssetComponent, DigitalAssetDetailComponent, DigitalAssetUpdateComponent, DigitalAssetDeleteDialogComponent],
  entryComponents: [DigitalAssetDeleteDialogComponent],
})
export class AmensystemDigitalAssetModule {}
