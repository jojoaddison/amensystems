import { Component, Input } from '@angular/core';

@Component({
    selector: 'jhi-slide-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class SlideAdminComponent {
    @Input() slides: any = [];
}
