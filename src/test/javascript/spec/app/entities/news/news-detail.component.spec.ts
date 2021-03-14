import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { NewsDetailComponent } from 'app/entities/news/news-detail.component';
import { News } from 'app/shared/model/news.model';

describe('Component Tests', () => {
  describe('News Management Detail Component', () => {
    let comp: NewsDetailComponent;
    let fixture: ComponentFixture<NewsDetailComponent>;
    const route = ({ data: of({ news: new News('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [NewsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NewsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NewsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load news on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.news).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
