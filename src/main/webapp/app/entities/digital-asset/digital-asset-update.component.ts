import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDigitalAsset, DigitalAsset } from 'app/shared/model/digital-asset.model';
import { DigitalAssetService } from './digital-asset.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-digital-asset-update',
  templateUrl: './digital-asset-update.component.html',
})
export class DigitalAssetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    url: [],
    resource: [],
    resourceContentType: [],
    type: [],
    createdDate: [],
    modifiedDate: [],
    createdBy: [],
    lastModifiedBy: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected digitalAssetService: DigitalAssetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ digitalAsset }) => {
      if (!digitalAsset.id) {
        const today = moment().startOf('day');
        digitalAsset.createdDate = today;
        digitalAsset.modifiedDate = today;
      }

      this.updateForm(digitalAsset);
    });
  }

  updateForm(digitalAsset: IDigitalAsset): void {
    this.editForm.patchValue({
      id: digitalAsset.id,
      name: digitalAsset.name,
      description: digitalAsset.description,
      url: digitalAsset.url,
      resource: digitalAsset.resource,
      resourceContentType: digitalAsset.resourceContentType,
      type: digitalAsset.type,
      createdDate: digitalAsset.createdDate ? digitalAsset.createdDate.format(DATE_TIME_FORMAT) : null,
      modifiedDate: digitalAsset.modifiedDate ? digitalAsset.modifiedDate.format(DATE_TIME_FORMAT) : null,
      createdBy: digitalAsset.createdBy,
      lastModifiedBy: digitalAsset.lastModifiedBy,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('amensystemApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const digitalAsset = this.createFromForm();
    if (digitalAsset.id !== undefined) {
      this.subscribeToSaveResponse(this.digitalAssetService.update(digitalAsset));
    } else {
      this.subscribeToSaveResponse(this.digitalAssetService.create(digitalAsset));
    }
  }

  private createFromForm(): IDigitalAsset {
    return {
      ...new DigitalAsset(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      url: this.editForm.get(['url'])!.value,
      resourceContentType: this.editForm.get(['resourceContentType'])!.value,
      resource: this.editForm.get(['resource'])!.value,
      type: this.editForm.get(['type'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      lastModifiedBy: this.editForm.get(['lastModifiedBy'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDigitalAsset>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
