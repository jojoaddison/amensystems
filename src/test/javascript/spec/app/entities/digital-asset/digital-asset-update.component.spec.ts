import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { DigitalAssetUpdateComponent } from 'app/entities/digital-asset/digital-asset-update.component';
import { DigitalAssetService } from 'app/entities/digital-asset/digital-asset.service';
import { DigitalAsset } from 'app/shared/model/digital-asset.model';

describe('Component Tests', () => {
  describe('DigitalAsset Management Update Component', () => {
    let comp: DigitalAssetUpdateComponent;
    let fixture: ComponentFixture<DigitalAssetUpdateComponent>;
    let service: DigitalAssetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [DigitalAssetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DigitalAssetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DigitalAssetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DigitalAssetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DigitalAsset('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DigitalAsset();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
