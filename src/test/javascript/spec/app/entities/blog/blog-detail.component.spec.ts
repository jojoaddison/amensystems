import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AmensystemTestModule } from '../../../test.module';
import { BlogDetailComponent } from 'app/entities/blog/blog-detail.component';
import { Blog } from 'app/shared/model/blog.model';

describe('Component Tests', () => {
  describe('Blog Management Detail Component', () => {
    let comp: BlogDetailComponent;
    let fixture: ComponentFixture<BlogDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ blog: new Blog('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [BlogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BlogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BlogDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load blog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.blog).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
