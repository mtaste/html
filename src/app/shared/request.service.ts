import {
	Injectable,
	Inject
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
	STARWARS_BASE_URL
} from "./constance.service";
import {
	UtilService
} from "./util.service";
import {
	Http,
	Headers,
	URLSearchParams
} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
@Injectable()
export class RequestService {
	public i = 0;
	constructor(@Inject(STARWARS_BASE_URL) private starwarUrl,
		private http: Http,
		private router: Router,
		private utilService: UtilService
	) {}
	private back(ret) {};
	Ask(t, url, bk) {

	};
	//Get请求API数据
	Get(url, bk) {
		this.utilService.loadingRequest = true;
		this.i++;
		let headers = new Headers();
		var token = window.localStorage["token"];
		token && (headers.append('token', token));
		this.http.get(`${this.starwarUrl}/` + url, {
				headers: headers
			})
			.map(res => res.json()).subscribe(ret => {
				if(ret && ret.code && ret.code == -401) {
					this.router.navigateByUrl('/user/login');
				};
				bk && bk(ret);
			}, err => {
				alert("请求错误.");
				this.i--;
			}, () => {
				this.i--;
				if(this.i <= 0) {
					this.i = 0;
					this.utilService.loadingRequest = false;
				}
			});
	};
	//POST数据
	Post(url, data, bk) {
		this.utilService.loadingRequest = true;
		this.i++;
		let param = new URLSearchParams();
		param.append('param', JSON.stringify(data));
		let t_url = `${this.starwarUrl}/` + url;
		let headers = new Headers();
		var token = window.localStorage["token"];
		token && (headers.append('token', token));
		this.http
			.post(t_url, param, {
				headers: headers
			})
			.map(res => res.json())
			.subscribe(
				ret => {
					if(ret) {
						if(ret.code && ret.code == -401) {
							this.router.navigateByUrl('/user/login');
						} else if(ret.code < 0) {
							alert(ret.msg);
						} else {
							bk && bk(ret);
						}
					}
				}, err => {
					alert("请求错误.");
					this.i--;
				}, () => {
					this.i--;
					if(this.i <= 0) {
						this.i = 0;
						this.utilService.loadingRequest = false;
					}
				}
			);
	}

}