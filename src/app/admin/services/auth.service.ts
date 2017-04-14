import {
	Injectable,
	Inject
} from '@angular/core';
import {
	STARWARS_BASE_URL
} from "../../shared/constance.service";
import {
	RequestService
} from "../../shared/request.service";
import {
	Http
} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Injectable()
export class AuthService {

	constructor(
		@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {};
	GetAuthFunc(id, bk) {
		this.requestService.Post('user/auth/funcs.json', {
			id: id
		}, (ret) => {
			var data = ret.data;
			var r = {};
			for(var k in data) {
				data[k].label = data[k].name;
				data[k].icon = data[k].authIcon;
				r[data[k].authValue] = data[k];
			}
			bk && bk(r);
		});
	};
}