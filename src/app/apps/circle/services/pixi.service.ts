import {
	Injectable
} from '@angular/core';

@Injectable()
export class PixiService {
	private PIXI = window['PIXI'];
	public hadInit = {};
	constructor() {};
	public GetPixi() {
		return this.PIXI;
	};
	public GetNewPixi(ele) {
		var w = ele.nativeElement.offsetWidth - 3;
		var h = window.innerHeight || document.body.clientHeight;
		h = h - 58;
		return new this.PIXI.Application(w, h, {
			backgroundColor: 0x1099bb
		});
	};
}