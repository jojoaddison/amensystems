import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISlideShow } from 'app/shared/model/slide-show.model';

@Component({
  selector: 'jhi-slide-show-detail',
  templateUrl: './slide-show-detail.component.html',
})
export class SlideShowDetailComponent implements OnInit {
  slideShow: ISlideShow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slideShow }) => (this.slideShow = slideShow));
  }

  previousState(): void {
    window.history.back();
  }
}
