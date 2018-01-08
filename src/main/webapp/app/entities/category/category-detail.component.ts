import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Category } from './category.model';
import { CategoryService } from './category.service';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit, AfterViewInit, OnDestroy {

    category: Category;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    products: Product[];

    constructor(
        private productService: ProductService,
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryService,
        private route: ActivatedRoute
    ) {
        this.products = [];
    }

    ngAfterViewInit() {
        if (this.category) {
            this.loadProduct(this.category.name);
        }
    }

    loadProduct(category: string) {
        this.productService.findByCategory(category).subscribe(
            (res: ResponseWrapper) => this.createProductList(res.json, res.headers),
            (res: ResponseWrapper) => this.productLoadError(res.json)
        );
    }

    private createProductList(data: any , headers: any) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            this.products.push(data[i]);
        }

        console.log(this.products);
    }

    private productLoadError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategories();
    }

    load(id) {
        this.categoryService.find(id).subscribe((category) => {
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

}
