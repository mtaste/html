import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild
} from '@angular/core';
import {
	ActivatedRoute
} from '@angular/router';
import {
	MenuItem,
	SelectItem
} from 'primeng/primeng';
import {
	AuthService,
	CrudService,
	UtilService
} from '../index';
@Component({
	selector: 'app-list-component',
	templateUrl: './list-component.component.html',
	styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {
	//菜单功能临时变量
	private t_menu = {};
	//列表菜单
	private funcs: MenuItem[] = [];
	private keyword = "";
	//列表
	private listData = [];
	private selectedObj = {};
	private totals = 0;
	@ViewChild('funcObj') funcObj;
	@Input() title = "";
	@Input() list = {};
	@Input() menus = {};
	@Input() obj = {};
	@Output() initEvent: EventEmitter < any > = new EventEmitter();
	@Output() selectEvent: EventEmitter < any > = new EventEmitter();
	constructor(
		private router: ActivatedRoute,
		private authService: AuthService,
		private utilService: UtilService,
		private crudService: CrudService
	) {
	};

	ngOnInit() {};

	Search() {
		var page = this.utilService.GetPageInfo();
		this.LoadData(page);
	};

	LoadData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		this.keyword && (param["keyword"] = this.keyword);
		this.selectedStatus && (param["status"] = this.selectedStatus);
		this.crudService.GetData(this.list['url'], param, (ret) => {
			ret = ret.data;
			this.listData = ret.rows;
			this.totals = ret.total;
		});
	};
	InitFuncs(e) {
		this.initEvent.emit(this);
	};
	RowSelect(e) {
		this.selectEvent.emit(e.data);
	};
	//状态列表
	@Input() status = [];
	private selectedStatus = "";
	StatusClick() {
		this.Search();
	}
	judge(objs) {
		for(var i in objs) {
			return true;
		}
		return false;
	}
}