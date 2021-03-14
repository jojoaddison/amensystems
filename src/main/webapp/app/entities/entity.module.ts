import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.AmensystemBlogModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.AmensystemCategoryModule),
      },
      {
        path: 'digital-asset',
        loadChildren: () => import('./digital-asset/digital-asset.module').then(m => m.AmensystemDigitalAssetModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.AmensystemHomeModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.AmensystemNewsModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.AmensystemProductModule),
      },
      {
        path: 'slide',
        loadChildren: () => import('./slide/slide.module').then(m => m.AmensystemSlideModule),
      },
      {
        path: 'slide-show',
        loadChildren: () => import('./slide-show/slide-show.module').then(m => m.AmensystemSlideShowModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AmensystemEntityModule {}
