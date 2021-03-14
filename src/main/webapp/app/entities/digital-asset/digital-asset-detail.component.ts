import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDigitalAsset } from 'app/shared/model/digital-asset.model';

@Component({
  selector: 'jhi-digital-asset-detail',
  templateUrl: './digital-asset-detail.component.html',
})
export class DigitalAssetDetailComponent implements OnInit {
  digitalAsset: IDigitalAsset | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ digitalAsset }) => (this.digitalAsset = digitalAsset));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
