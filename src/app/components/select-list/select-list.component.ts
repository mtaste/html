import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	MenuItem
} from 'primeng/primeng';
import {
	UtilService,
	CrudService
} from '../index';
@Component({
	selector: 'app-select-list',
	templateUrl: './select-list.component.html',
	styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
	//菜单功能临时变量
	private t_menu = {};

	@Input() listModel = {};
	@Output() initEvent: EventEmitter < any > = new EventEmitter();
	@Output() removeEvent: EventEmitter < any > = new EventEmitter();
	@Output() chooseEvent: EventEmitter < any > = new EventEmitter();
	@Input() title;
	private showFuns = true;
	private funs: MenuItem[] = [];
	private listData = [];
	private selectedObjs = [];
	private totals;
	private display = false;
	private keyword = "";
	//已选择列表
	private chooseList = [];
	private chooseObjs = [];
	private chooseTotal;
	constructor(
		private utilService: UtilService,
		private crudService: CrudService
	) {};

	ngOnInit() {
		this.funs.push({
			label: "新增",
			icon: "fa-plus",
			command: (auth) => {
				this.t_menu = auth.item;
				this.display = true;
				this.SearchChooseList();
			}
		});
		this.funs.push({
			label: "删除",
			icon: "fa-remove",
			command: (auth) => {
				var ids = this.utilService.GetIds(this.selectedObjs, "id");
				if(!ids) return;
				var m = {
					bk: () => {
						this.t_menu = auth.item;
						var d = {};
						for(var i in this.selectedObjs) {
							var m = this.selectedObjs[i];
							d[m["id"]] = "Y";
						};
						var temp = [];
						for(var k in this.listData) {
							var m = this.listData[k];
							if(d[m["id"]] == "Y") {
								continue;
							};
							temp.push(m);
						};
						this.listData = temp;
						this.chooseObjs = [];
						this.selectedObjs = [];
					},
					ids: ids
				}
				this.removeEvent.emit(m);
			}
		});
		this.initEvent.emit(this);
	};
	private billId = "";
	Id(id) {
		this.billId = id;
		var page = this.utilService.GetPageInfo();
		this.LoadData(page);
	};
	LoadData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows,
			id: this.billId
		};
		var url = this.listModel['listUrl'];
		this.crudService.GetData(url, param, (ret) => {
			ret = ret.data;
			this.listData = ret.rows;
			this.totals = ret.total;
		});
	};
	SearchChooseList() {
		var page = this.utilService.GetPageInfo();
		this.LoadChooseData(page);
	};

	LoadChooseData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows,
			id: this.billId
		};
		this.keyword && (param["keyword"] = this.keyword);
		var url = this.listModel['chooseUrl'];
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
		var m = {
			bk: () => {
				for(var k in this.chooseObjs) {
					var m = this.chooseObjs[k];
					this.listData.unshift(m);
				};
				this.chooseObjs = [];
				this.selectedObjs = [];
			},
			ids: ids
		};
		this.chooseEvent.emit(m);
	};

	private editDisplay = false;
	private editForm = [];
	private formObj = {};
	private index;
	EditData(indx) {
		this.index = indx;
		var tObj = this.listData[indx];
		this.editDisplay = true;
		var f = this.formObj['formModel'];
		var mt = this.utilService.CopyObj(f.value, tObj);
		f.setValue(mt);
	};
	onSubmit(value) {
		this.editDisplay = false;
		var param = this.utilService.CopyObj(value, value);
		param["billId"] = this.billId;
		var url = this.listModel['editUrl'];
		this.crudService.GetData(url, param, (ret) => {
			var index = this.index;
			for(var k in value) {
				this.listData[index][k] = value[k];
			}
		});
	};
	FormInit(e) {
		this.formObj = e;
	};
}