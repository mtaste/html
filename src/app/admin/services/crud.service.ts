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
export class CrudService {

	constructor(
		@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {};
	//保存数据
	SaveData(url, param, bk) {
		this.requestService.Post(url, param, bk);
	};
	//删除数据
	DeleteData(ul, id, bk) {
		this.requestService.Post(ul, {
			id: id
		}, bk);
	};
	//获取数据
	GetData(url, param, bk) {
		this.requestService.Post(url, param, bk);
	};
	//提交表单
	AppData(ul, param, bk) {
		this.requestService.Post(ul, param, bk);
	};
}