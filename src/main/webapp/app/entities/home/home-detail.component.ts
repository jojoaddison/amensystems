import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Home } from './home.model';
import { HomeService } from './home.service';
import { Product } from '../product';
import { Tile } from '../../widgets';
import { Category } from '../category';
import { LocalStorage } from 'ng2-webstorage';

@Component({
    selector: 'jhi-home-detail',
    templateUrl: './home-detail.component.html',
    styleUrls: ['../entities.component.css', './home.component.css']
})
export class HomeDetailComponent implements OnInit, OnDestroy {

    home: Home;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    tileConfig: {};

    advertTitle = 'Adverts & Promotions';
    @LocalStorage() advertTiles: Tile[];
    @LocalStorage() adverts: Product[];

    categoryTitle = 'Product Categories';
    @LocalStorage() categoryTiles: Tile[];
    @LocalStorage() categories: Category[];

    constructor(
        private eventManager: JhiEventManager,
        private homeService: HomeService,
        private route: ActivatedRoute
    ) {
        this.tileConfig = {
            grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
            speed: 1000,
            interval: 3000,
            point: {
            visible: true,
            pointStyles: `
                .ngxcarouselPoint {
                list-style-type: none;
                text-align: center;
                padding: 12px;
                margin: 0;
                white-space: nowrap;
                overflow: auto;
                box-sizing: border-box;
                }
                .ngxcarouselPoint li {
                display: inline-block;
                border-radius: 50%;
                border: 2px solid rgba(0, 0, 0, 0.55);
                padding: 4px;
                margin: 0 3px;
                transition-timing-function: cubic-bezier(.17, .67, .83, .67);
                transition: .4s;
                }
                .ngxcarouselPoint li.active {
                    background: #6b6b6b;
                    transform: scale(1.2);
                }
            `
            },
            load: 2,
            touch: true
        };
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHomes();
    }

    load(id) {
        this.homeService.find(id).subscribe((home) => {
            this.home = home;
            this.initAdverts(home.advert);
        });
    }

    initAdverts(adverts: Product[]) {
        this.adverts = adverts;
        this.advertTiles = [];
        this.adverts.forEach((advert) => {
            const url = 'data:' + advert.photoContentType + ';base64,' + advert.photo;
            advert.url = url;
            this.advertTiles.push(new Tile(advert.id, advert.name, advert.category, url, false));
        });
        console.log(this.advertTiles);
        console.log(this.adverts);
    }

    initCategories(categories: Category[])  {
        this.categories = categories;
        this.categoryTiles = [];
        this.categories.forEach((category) => {
            const url = 'data:' + category.photoContentType + ';base64,' + category.photo;
            category.link = url;
            this.categoryTiles.push(new Tile(category.id, category.name, category.description, url, false));
        });
        console.log(this.categoryTiles);
        console.log(this.categories);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHomes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'homeListModification',
            (response) => this.load(this.home.id)
        );
    }

    trackId(index: number, item: any) {
        return item.id;
    }

    public onAdvertSelected(tile: Tile) {
        const advert = this.findAdvertById(tile.id);
        if (tile.selected) {
            this.home.advert.push(advert);
        } else {
            const index = this.home.advert.findIndex((element) => element.id === advert.id);
            this.home.advert.splice(index, 1);
        }
    }

    private findAdvertById(id: string): Product {
        const advert = this.adverts.find((element) => element.id === id);
        return advert;
    }
    private advertSelected(advert: Product): boolean {
       const index = this.home.advert.findIndex((element) => element.id === advert.id);
        return index > -1;
    }

    public onCategorySelected(tile: Tile) {
        const category = this.findCategoryById(tile.id);
        if (tile.selected) {
            this.home.category.push(category);
        } else {
            const index = this.home.category.findIndex((element) => element.id === category.id);
            this.home.category.splice(index, 1);
        }
    }

    private findCategoryById(id: string): Product {
        const category = this.categories.find((element) => element.id === id);
        return category;
    }
    private categorySelected(category: Category): boolean {
       const index = this.home.category.findIndex((element) => element.id === category.id);
        return index > -1;
    }
}
