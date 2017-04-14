import {
	Component,
	OnInit
} from '@angular/core';
import {
	AppsRouterService
} from "./apps.routers.service";
import {
	Title
} from '@angular/platform-browser';
@Component({
	selector: 'app-apps',
	templateUrl: './apps.component.html',
	styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {
	private show;

	constructor(
		private appsRouterService: AppsRouterService,
		private titleService: Title
	) {
		this.titleService.setTitle('应用商城');
	}
	ngOnInit() {
		setTimeout(() => {
			console.log(this.appsRouterService);
		}, 5000);
	}

}