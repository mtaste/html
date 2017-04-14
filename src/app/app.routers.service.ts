import {
	Injectable,
	Inject
} from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import {
	STARWARS_BASE_URL
} from "./shared/constance.service";
import {
	Http
} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
@Injectable()
export class AppRouterService {
	constructor(
		private router: Router,
		private http: Http,
		@Inject(STARWARS_BASE_URL) private starwarUrl
	) {};
	RunApp(state) {
		return new Promise < Boolean > ((resolve, reject) => {
			resolve(true);
		});
	}
}
@Injectable()
export class AppRouterActivate implements CanActivate {
	constructor(
		private router: Router,
		private appRouterService: AppRouterService
	) {}
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var ret = this.appRouterService.RunApp(state);
		return ret;
	}
}