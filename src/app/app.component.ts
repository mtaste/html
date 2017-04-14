import {
	Component
} from '@angular/core';
import {
	lang
} from "./conf/conf";
import {
	I18nService
} from "angular2-i18n";
import {
	UtilService
} from "./shared/index";
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [I18nService]
})
export class AppComponent {
	constructor(
		private i18n: I18nService,
		private utilService: UtilService) {
		this.i18n.init(lang);
		this.ct = this.utilService;
	}
	private ct;
}