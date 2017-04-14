import {
	Component,
	OnInit
} from '@angular/core';
import {
	I18nService
} from "angular2-i18n";
import {
	lang
} from "../conf/conf";
@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
	providers: [I18nService]
})
export class UserComponent implements OnInit {
	constructor(private i18n: I18nService) {
		this.i18n.init(lang);
	}
	ngOnInit() {}

}