import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { News } from './news.model';
import { NewsPopupService } from './news-popup.service';
import { NewsService } from './news.service';
import { Tile } from '../../widgets';
import { SlideService, Slide } from '../slide';
import { ResponseWrapper } from '../../shared';
import { LocalStorage } from 'ng2-webstorage';

@Component({
    selector: 'jhi-news-dialog',
    templateUrl: './news-dialog.component.html',
    styleUrls: ['../entities.component.css']
})
export class NewsDialogComponent implements OnInit {

    news: News;
    content: String;
    isSaving: boolean;
    title = 'Slides';
    @LocalStorage() tiles: Tile[];
    @LocalStorage() slides: Slide[];

    constructor(
        private slideService: SlideService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private newsService: NewsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;

        if (typeof (this.news.slides) === 'undefined' || this.news.slides === null) {
            this.news.slides = [];
        }
        console.log(this.news);

        this.slideService.query().subscribe(
            (res: ResponseWrapper) => {
                this.slides = res.json;
                this.tiles = [];
                this.slides.forEach((slide) => {
                    this.tiles.push(new Tile(slide.id, slide.title, slide.description, slide.url, this.slideSelected(slide)));
                });
                console.log(this.tiles);
                console.log(this.slides);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    setContentChanged(data: string): void {
        this.news.content = data;
    }

    save() {
        this.isSaving = true;
        if (this.news.id !== undefined) {
            this.subscribeToSaveResponse(
                this.newsService.update(this.news));
        } else {
            this.subscribeToSaveResponse(
                this.newsService.create(this.news));
        }
    }

    private slideSelected(slide: Slide): boolean {
        const index = this.news.slides.findIndex((element) => element.id === slide.id);
         return index > -1;
     }
    public onTileSelected(tile: Tile) {
        const slide = this.findSlideById(tile.id);
        if (tile.selected) {
            this.news.slides.push(slide);
        } else {
            const index = this.news.slides.findIndex((element) => element.id === slide.id);
            this.news.slides.splice(index, 1);
        }
    }

    private findSlideById(id: string): Slide {
        const slide = this.slides.find((element) => element.id === id);
        return slide;
    }

    private subscribeToSaveResponse(result: Observable<News>) {
        result.subscribe((res: News) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: News) {
        this.eventManager.broadcast({ name: 'newsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-news-popup',
    template: ''
})
export class NewsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsPopupService: NewsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.newsPopupService
                    .open(NewsDialogComponent as Component, params['id']);
            } else {
                this.newsPopupService
                    .open(NewsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
