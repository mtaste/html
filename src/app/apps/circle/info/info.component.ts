import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	PixiService,
	HallService
} from "../services/index";
@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
	@ViewChild('infoContent') infoContent;
	constructor(
		private pixi: PixiService,
		private hall: HallService
	) {

	};

	ngOnInit() {};

	ngAfterViewInit() {
		var _PIXI = this.pixi.GetPixi();
		var app = new _PIXI.Application();
		this.infoContent.nativeElement.appendChild(app.view);

	};

}