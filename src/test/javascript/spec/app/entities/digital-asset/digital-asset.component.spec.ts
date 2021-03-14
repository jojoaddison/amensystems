import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AmensystemTestModule } from '../../../test.module';
import { DigitalAssetComponent } from 'app/entities/digital-asset/digital-asset.component';
import { DigitalAssetService } from 'app/entities/digital-asset/digital-asset.service';
import { DigitalAsset } from 'app/shared/model/digital-asset.model';

describe('Component Tests', () => {
  describe('DigitalAsset Management Component', () => {
    let comp: DigitalAssetComponent;
    let fixture: ComponentFixture<DigitalAssetComponent>;
    let service: DigitalAssetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [DigitalAssetComponent],
      })
        .overrideTemplate(DigitalAssetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DigitalAssetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DigitalAssetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DigitalAsset('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.digitalAssets && comp.digitalAssets[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
