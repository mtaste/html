import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	UtilService,
	CrudService
} from '../index';
@Component({
	selector: 'app-select-dialog',
	templateUrl: './select-dialog.component.html',
	styleUrls: ['./select-dialog.component.css']
})
export class SelectDialogComponent implements OnInit {
	private keyword = "";
	private display = false;
	private chooseList = [];
	private chooseObjs = [];
	private chooseTotal;
	private billId = "";
	@Input() chooseModel = {};
	@Input() chooseURL;
	@Output() chooseEvent: EventEmitter < any > = new EventEmitter();
	@Input() rows;

	constructor(
		private utilService: UtilService,
		private crudService: CrudService) {};

	ngOnInit() {};

	SearchChooseList() {
		var page = this.utilService.GetPageInfo();
		if(this.rows) page['rows'] = this.rows;
		this.LoadChooseData(page);
	};

	LoadChooseData(e) {
		if(!this.display) return;
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows,
			id: this.billId
		};
		this.keyword && (param["keyword"] = this.keyword);
		var url = this.chooseURL;
		this.crudService.GetData(url, param, (ret) => {
			ret = ret.data;
			this.chooseList = ret.rows;
			this.chooseTotal = ret.total;
		});
	};

	ChooseYes() {
		this.display = false;
		var ids = this.utilService.GetIds(this.chooseObjs, "id");
		if(!ids) return;
		this.chooseEvent.emit(ids);
	};

}