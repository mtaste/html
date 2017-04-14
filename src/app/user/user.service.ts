import {
	Injectable,
	Inject
} from '@angular/core';
import {
	STARWARS_BASE_URL
} from "../shared/constance.service";
import {
	Http
} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {
	RequestService
} from "../shared/request.service";

@Injectable()
export class UserService {

	constructor(@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private requestService: RequestService
	) {}

	getPeople() {
		return this.http.get(`${this.starwarUrl}/user/userList.json`)
			.map(res => res.json());
	}
	GetUserMenu(bk) {
		this.requestService.Get('user/userMenu.json', bk);
	}
	LoginUser(data, bk) {
		this.requestService.Post('user/login.json', data, bk);
	}
	GetUserInfo(bk) {
		this.requestService.Get('user/userInfo.json', bk);
	}
}