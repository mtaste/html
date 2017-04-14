import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService
} from '../index';
@Component({
	selector: 'oa-app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

	constructor(private utilService: UtilService) {
		this.utilService.loadingCompont = false;
	}

	ngOnInit() {}

}