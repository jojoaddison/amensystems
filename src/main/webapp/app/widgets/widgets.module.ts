import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinyEditorComponent, TileboxComponent } from './index';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
  imports: [CommonModule, NgxCarouselModule],
  declarations: [TinyEditorComponent, TileboxComponent],
  exports: [TinyEditorComponent, TileboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetsModule {}
