import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AmensystemTestModule } from '../../../test.module';
import { DigitalAssetDetailComponent } from 'app/entities/digital-asset/digital-asset-detail.component';
import { DigitalAsset } from 'app/shared/model/digital-asset.model';

describe('Component Tests', () => {
  describe('DigitalAsset Management Detail Component', () => {
    let comp: DigitalAssetDetailComponent;
    let fixture: ComponentFixture<DigitalAssetDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ digitalAsset: new DigitalAsset('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [DigitalAssetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DigitalAssetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DigitalAssetDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load digitalAsset on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.digitalAsset).toEqual(jasmine.objectContaining({ id: '123' }));
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
