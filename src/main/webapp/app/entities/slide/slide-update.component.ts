import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISlide, Slide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-slide-update',
  templateUrl: './slide-update.component.html',
})
export class SlideUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    url: [],
    title: [],
    description: [],
    photo: [],
    photoContentType: [],
    createdDate: [],
    modifiedDate: [],
    createdBy: [],
    modifiedBy: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected slideService: SlideService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slide }) => {
      if (!slide.id) {
        const today = moment().startOf('day');
        slide.createdDate = today;
        slide.modifiedDate = today;
      }

      this.updateForm(slide);
    });
  }

  updateForm(slide: ISlide): void {
    this.editForm.patchValue({
      id: slide.id,
      url: slide.url,
      title: slide.title,
      description: slide.description,
      photo: slide.photo,
      photoContentType: slide.photoContentType,
      createdDate: slide.createdDate ? slide.createdDate.format(DATE_TIME_FORMAT) : null,
      modifiedDate: slide.modifiedDate ? slide.modifiedDate.format(DATE_TIME_FORMAT) : null,
      createdBy: slide.createdBy,
      modifiedBy: slide.modifiedBy,
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const slide = this.createFromForm();
    if (slide.id !== undefined) {
      this.subscribeToSaveResponse(this.slideService.update(slide));
    } else {
      this.subscribeToSaveResponse(this.slideService.create(slide));
    }
  }

  private createFromForm(): ISlide {
    return {
      ...new Slide(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlide>>): void {
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
