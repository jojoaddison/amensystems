import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHome, Home } from 'app/shared/model/home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'jhi-home-update',
  templateUrl: './home-update.component.html',
})
export class HomeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    slides: [],
    advert: [],
    category: [],
    state: [],
    version: [],
    createdBy: [],
    createdDate: [],
    modifiedBy: [],
    modifiedDate: [],
  });

  constructor(protected homeService: HomeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ home }) => {
      if (!home.id) {
        const today = moment().startOf('day');
        home.createdDate = today;
        home.modifiedDate = today;
      }

      this.updateForm(home);
    });
  }

  updateForm(home: IHome): void {
    this.editForm.patchValue({
      id: home.id,
      slides: home.slides,
      advert: home.advert,
      category: home.category,
      state: home.state,
      version: home.version,
      createdBy: home.createdBy,
      createdDate: home.createdDate ? home.createdDate.format(DATE_TIME_FORMAT) : null,
      modifiedBy: home.modifiedBy,
      modifiedDate: home.modifiedDate ? home.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const home = this.createFromForm();
    if (home.id !== undefined) {
      this.subscribeToSaveResponse(this.homeService.update(home));
    } else {
      this.subscribeToSaveResponse(this.homeService.create(home));
    }
  }

  private createFromForm(): IHome {
    return {
      ...new Home(),
      id: this.editForm.get(['id'])!.value,
      slides: this.editForm.get(['slides'])!.value,
      advert: this.editForm.get(['advert'])!.value,
      category: this.editForm.get(['category'])!.value,
      state: this.editForm.get(['state'])!.value,
      version: this.editForm.get(['version'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHome>>): void {
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
