import {
	Component,
	OnInit
} from '@angular/core';
import {
	UtilService
} from "../shared/util.service";
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private utilService: UtilService
	) {}

	ngOnInit() {}

	GoLogin() {
		console.log(1);
		this.utilService.loadingCompont = true;
	}
}