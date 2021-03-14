import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISlideShow, SlideShow } from 'app/shared/model/slide-show.model';
import { SlideShowService } from './slide-show.service';

@Component({
  selector: 'jhi-slide-show-update',
  templateUrl: './slide-show-update.component.html',
})
export class SlideShowUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    slides: [],
    createdDate: [],
    modifiedDate: [],
    lastModifiedBy: [],
  });

  constructor(protected slideShowService: SlideShowService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slideShow }) => {
      if (!slideShow.id) {
        const today = moment().startOf('day');
        slideShow.createdDate = today;
        slideShow.modifiedDate = today;
      }

      this.updateForm(slideShow);
    });
  }

  updateForm(slideShow: ISlideShow): void {
    this.editForm.patchValue({
      id: slideShow.id,
      name: slideShow.name,
      slides: slideShow.slides,
      createdDate: slideShow.createdDate ? slideShow.createdDate.format(DATE_TIME_FORMAT) : null,
      modifiedDate: slideShow.modifiedDate ? slideShow.modifiedDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedBy: slideShow.lastModifiedBy,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const slideShow = this.createFromForm();
    if (slideShow.id !== undefined) {
      this.subscribeToSaveResponse(this.slideShowService.update(slideShow));
    } else {
      this.subscribeToSaveResponse(this.slideShowService.create(slideShow));
    }
  }

  private createFromForm(): ISlideShow {
    return {
      ...new SlideShow(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      slides: this.editForm.get(['slides'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedBy: this.editForm.get(['lastModifiedBy'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlideShow>>): void {
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
