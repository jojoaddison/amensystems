import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Account, LoginModalService, Principal } from '../shared';
import { AmensystemSlideModule } from '../entities/slide/slide.module';
import {style, animate, trigger, transition} from '@angular/animations';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Slide } from '../entities/slide';
import { SlideService } from '../entities/slide';
import { ITEMS_PER_PAGE, ResponseWrapper } from '../shared';

import { Category } from '../entities/category';
import { CategoryService } from '../entities/category';
import { LocalStorage } from 'ng2-webstorage';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService, Home } from '../entities/home';
import { Product } from '../entities/product';
import { ProductService } from '../entities/product';
import { Tile } from '../widgets';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ],
    providers: [NgbCarouselConfig],
    animations: [
        trigger('fade', [
            /***/
        ])
    ]
})

export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    @LocalStorage() slides: Slide[];
    @LocalStorage() categories: Category[];
    currentHome: Home;
    advertTitle = '';
    @LocalStorage() advertTiles: Tile[];
    @LocalStorage() adverts: Product[];
    showSelected = false;

    constructor(
        private categoryService: CategoryService,
        private slideService: SlideService,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private sliderConfig: NgbCarouselConfig,
        private sanitizer: DomSanitizer,
        private homeService: HomeService,
        private productService: ProductService
    ) {
       sliderConfig.interval = 5000;
       sliderConfig.wrap = true;
       sliderConfig.keyboard = true;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.loadAll();
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    trackSlideId(index: number, item: Slide) {
        return item.id;
    }

    trackCategoryId(index: number, item: Category) {
        return item.id;
    }

    loadAll() {
        // tslint:disable-next-line:no-console
        console.info('loading...');
        this.loadCurrentHome();
    }

    private loadProducts() {
        this.productService.query().subscribe((res) => {
            const products = res.json;
            this.initAdverts(products);
        });
    }

    private initAdverts(adverts: Product[]) {
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

    public onAdvertSelected(tile: Tile) {
        const advert = this.findAdvertById(tile.id);
        // Navigate to Advert
    }

    private findAdvertById(id: string): Product {
        const advert = this.adverts.find((element) => element.id === id);
        return advert;
    }
    private advertSelected(advert: Product): boolean {
       const index = this.adverts.findIndex((element) => element.id === advert.id);
        return index > -1;
    }

    private loadCurrentHome() {
        this.homeService.getCurrentHome().subscribe((home: Home) => {
            console.log('home');
            console.log(home);
            if (home && home !== null) {
                this.currentHome = home;
                if (home.slides.length > 0) {
                    this.slides = home.slides;
                } else {
                    this.loadSlides();
                }
                if (home.advert.length > 0) {
                    this.initAdverts(home.advert);
                } else {
                    this.loadProducts();
                }
                if (home.category.length > 0) {
                    this.categories = home.category;
                } else {
                    this.loadCategories();
                }
            } else {
                this.loadSlides();
                this.loadCategories();
                this.loadProducts();
            }
        });
    }

    private loadCategories() {
        this.categoryService.query({}).subscribe(
            (res: ResponseWrapper) => {
                this.categories = res.json;
                this.createCategories();
            }
        );
    }

    private createCategories() {
        console.log(this.categories);
    }

    private loadSlides() {
        this.slideService.query().subscribe(
            (res: ResponseWrapper) => {
                this.slides = res.json;
                this.createSlides();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private createSlides() {
        console.log(this.slides);
        if ( this.slides && this.slides.length < 0 ) {
            for ( let i = 1; i < 6; i++ ) {
                this.slides.push( {
                    id: i.toString(),
                    url: '/content/slides/shop/slide-' + i + '.JPG',
                    title: '',
                    description: ''
                } );
            }
            console.log('slides');
            console.log(this.slides);
            console.log('slides');
        }
    }

    setSlideStyle(slide: any): String {
        const url = 'background-image: url(\'' + this.sanitizer.bypassSecurityTrustUrl(slide.url) + '\')';
        console.log(url);
        return url;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
