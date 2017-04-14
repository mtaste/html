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
export class AuthOrgService {

	constructor(@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {}
	GetAuthOrgList(bk) {
		this.requestService.Get('auth/define/list.json', bk);
	};
	GetOrgList(param, bk) {
		this.requestService.Post('org/list.json', param, bk);
	};
	GetOrgAuth(id, bk) {
		this.requestService.Post('org/auth.json', {
			orgId: id
		}, (ret) => {
			var data = ret.data;
			var b = [];
			for(var k in data) {
				b.push({
					id: data[k]['authId']
				});
			};
			bk && bk(b);
		});
	};
	SaveOrgAuth(ul, param, bk) {
		this.requestService.Post('org/list.json', param, bk);
	};
}