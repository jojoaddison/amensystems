import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduct } from 'app/shared/model/product.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProductService } from './product.service';
<<<<<<< HEAD
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { Category } from '../category';
import { CategoryService } from '../category/category.service';
import { Tile } from '../../widgets';
=======
import { ProductDeleteDialogComponent } from './product-delete-dialog.component';
>>>>>>> jhipster_upgrade

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  products: IProduct[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

<<<<<<< HEAD
    categories: any[];
    products: Product[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private productService: ProductService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private categoryService: CategoryService
    ) {
        this.categories = [];
        this.products = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.categoryService.query({}).subscribe((res) => {
            const categories = res.json;
            this.productService.getProductsGroupedByCategory().subscribe((productCategories) => {
                console.log(productCategories);
                const keys = Object.keys(productCategories);
                keys.forEach((key) => {
                    const category = categories.find((cat) => cat.name === key);
                    category.products = productCategories[key];
                    this.categories.push(category);
                });
                console.log(this.categories);
            });
        });
        this.productService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe((res) => this.onSuccess, (error) => this.onError);
    }
=======
  constructor(
    protected productService: ProductService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.products = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.productService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IProduct[]>) => this.paginateProducts(res.body, res.headers));
  }
>>>>>>> jhipster_upgrade

  reset(): void {
    this.page = 0;
    this.products = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProducts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProduct): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('productListModification', () => this.reset());
  }

  delete(product: IProduct): void {
    const modalRef = this.modalService.open(ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.product = product;
  }

<<<<<<< HEAD
    public onProductSelected(tile: Tile) {
        console.log(tile);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.products.push(data[i]);
        }
=======
  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
>>>>>>> jhipster_upgrade
    }
    return result;
  }

  protected paginateProducts(data: IProduct[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.products.push(data[i]);
      }
    }
<<<<<<< HEAD

    public isAuthenticated() {
        return this.principal.isAuthenticated();
    }
=======
  }
>>>>>>> jhipster_upgrade
}
