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
export class MgUserService {

	constructor(@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {};
	//获取可以选择用户列表信息
	GetUserList(param, bk) {
		this.requestService.Post('user/list.json', param, bk);
	};
}