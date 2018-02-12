import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from './news.model';
import { LocalStorage } from 'ng2-webstorage';
import { NewsService } from './news.service';
import { JhiEventManager, JhiDataUtils, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';

@Component(
    {
    selector: 'jhi-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['../entities.component.css']
    }
)
export class NewsViewComponent implements OnInit {

    @LocalStorage() news: News[];

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private newsService: NewsService,
        private route: ActivatedRoute
    ) {
        this.news = [];
    }

    ngOnInit() {

    }
}
