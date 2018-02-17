import { OnInit, Input, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jhi-tilebox',
    templateUrl: './tilebox.component.html',
    styleUrls: ['./tilebox.component.css']
})
export class TileboxComponent implements OnInit {

    @Input() config: {};
    @Input() title: string;
    @Input() tiles: any[];
    @Input() showSelected = true;
    @Output() tileSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        console.log('init-tilebox');
        if (!this.config || typeof (this.config) === 'undefined' ) {
            this.config = {
                grid: { xs: 2, sm: 3, md: 4, lg: 6, all: 0 },
                speed: 1000,
                interval: 3000,
                point: {
                visible: true,
                pointStyles: `
                    .ngxcarouselPoint {
                    list-style-type: none;
                    text-align: center;
                    padding: 12px;
                    margin: 0;
                    white-space: nowrap;
                    overflow: auto;
                    box-sizing: border-box;
                    }
                    .ngxcarouselPoint li {
                    display: inline-block;
                    border-radius: 50%;
                    background: #6b6b6b;
                    padding: 5px;
                    margin: 0 3px;
                    transition: .4s;
                    }
                    .ngxcarouselPoint li.active {
                        border: 2px solid rgba(0, 0, 0, 0.55);
                        transform: scale(1.2);
                        background: transparent;
                    }
                `
                },
                load: 2,
                loop: true,
                touch: true,
                easing: 'ease',
                animation: 'lazy'
            };
        }
    }

    init(event: any) {
       // console.log(event);
    }

    toggleSelected(tile: Tile): void {
        tile.selected = !tile.selected;
        this.tileSelected.emit(tile);
    }
}

export class Tile {
    selected: boolean;
    title: string;
    description: string;
    id: string;
    url: string;
    constructor(id: string, title: string, description: string, url: string, selected?: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.selected = selected;
    }
}
