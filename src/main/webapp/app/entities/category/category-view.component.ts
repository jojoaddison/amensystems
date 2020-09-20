import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Category } from './category.model';
import { CategoryService } from './category.service';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { LocalStorage } from 'ng2-webstorage';
import { Tile } from '../../widgets';

@Component({
    selector: 'jhi-category-view',
    templateUrl: './category-view.component.html'
})
export class CategoryViewComponent implements OnInit, OnDestroy {

    category: Category;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    products: Product[];
    @LocalStorage() categories: Category[];
    tiles: Tile[] = [];
    title = 'Categories';

    constructor(
        private productService: ProductService,
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.products = [];
    }

    nextCategory() {
    }

    previousCategory() {
    }

    loadProduct(category: string) {
        this.productService.findByCategory(category).subscribe(
            (res: ResponseWrapper) => this.createProductList(res.json, res.headers),
            (res: ResponseWrapper) => this.productLoadError(res.json)
        );
    }

    private createProductList(data: any , headers: any) {
        this.products = [];
        for (let i = 0; i < data.length; i++) {
            this.products.push(data[i]);
        }
        console.log(this.products);
    }

    private productLoadError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnInit() {
        this.categoryService.query({}).subscribe(
            (res: ResponseWrapper) => {
                this.categories = res.json;
                this.tiles = [];
                this.categories.forEach((category) => {
                    const url = 'data:' + category.photoContentType + ';base64,' + category.photo;
                    this.tiles.push(new Tile(category.id, category.name, category.description, url, false));
                });
            }
        );
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['name']);
        });
        this.registerChangeInCategories();
    }

    public onCategorySelected(tile: Tile) {
        this.router.navigate(['category-view',  tile.title]);

    }

    load(name) {
        this.categoryService.findByName(name).subscribe((category) => {
            this.category = category;
            this.loadProduct(this.category.name);
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoryListModification',
            (response) => this.load(this.category.id)
        );
    }

    trackId(item: any) {
        return item.id;
    }

}
