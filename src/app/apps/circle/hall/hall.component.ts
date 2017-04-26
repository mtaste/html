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
	selector: 'app-hall',
	templateUrl: './hall.component.html',
	styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {
	@ViewChild('hallContent') hallContent;
	constructor(
		private pixi: PixiService,
		private hall: HallService
	) {

	};

	ngOnInit() {};

	ngAfterViewInit() {
		var _PIXI = this.pixi.GetPixi();
		var app = this.pixi.GetNewPixi(this.hallContent);
		this.hallContent.nativeElement.appendChild(app.view);
		app.stage.addChild(_PIXI.Sprite.fromImage('assets/images/bunny.jpg'));

	};

}