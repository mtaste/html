import {
	Component
} from '@angular/core';
import {
	lang
} from "../../conf/conf";
import {
	I18nService
} from "angular2-i18n";
@Component({
	selector: 'apps-community-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [I18nService]
})
export class AppComponent {
	title = 'app works!';
	constructor(private i18n: I18nService) {
		this.i18n.init(lang);
	}
}