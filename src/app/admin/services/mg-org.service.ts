import {
	Injectable,
	Inject
} from '@angular/core';
import {
	STARWARS_BASE_URL
} from "../../shared/constance.service";

import {
	Http
} from "@angular/http";
import {
	RequestService
} from "../../shared/request.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Injectable()
export class MgOrgService {

	constructor(@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {};
	//获取列表信息
	GetChooseOrgList(param, bk) {
		this.requestService.Post('mg/org/authBill/orgList.json', param, bk);
	};
	//获取机构权限列表
	GetCanAuthList(bk) {
		this.requestService.Post('mg/org/authBill/authList.json', {}, bk);
	};
	//获取机构选择权限
	GetBillDetail(id, bk) {
		this.requestService.Post('mg/org/authBill/detail.json', {
			id: id
		}, bk);
	};
	//获取机构权限
	GetOrgAuth(id, bk) {
		this.requestService.Post('mg/org/auths.json', {
			orgId: id
		}, bk);
	};
	//获取机构列表
	GetOrgList(param, bk) {
		this.requestService.Post('org/list.json', param, bk);
	};
}