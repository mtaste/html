import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	AuthOrgService,
	UtilService,
	CrudService
} from '../index';
@Component({
	selector: 'app-easy-form-component',
	templateUrl: './easy-form-component.component.html',
	styleUrls: ['./easy-form-component.component.css']
})
export class EasyFormComponentComponent implements OnInit {
	private obj = {};
	private RestFuns;
	//列表
	private menus = {};
	//列表
	@Input() list = {};
	//填写信息
	@Input() form = [];
	@Input() title;
	@Input() status;
	@Input() paramFunc;
	constructor(
		private utilService: UtilService,
		private crudService: CrudService
	) {
		//菜单
		this.menus = this.getMenus();
	};

	ngOnInit() {};

	InitListForm(e) {
		this.obj = e;
		e.listObj.funcObj.RestFuncs(['add']);
	};
	RowSeleted(data) {
		var f = this.obj['listObj']['funcObj'];
		if(!data && data.id) {
			return;
		};
		f.RestFuncs(['add', 'mod']);
	};
	private getMenus() {
		return {
			add: (auth, ft) => {
				//新增
				ft.step = 2;
				var m = this.utilService.ClearObj(ft.formObj.formModel.value);
				ft.formObj.formModel.setValue(m);
				ft.formObj.canSave = true;
				ft.authData = [];
			},
			mod: (auth, ft) => {
				//修改
				var id = ft.listObj.selectedObj.id;
				if(!id) return;
				ft.step = 2;
				ft.formObj.canSave = true;
				var t = this.utilService.ClearObj(ft.formObj.formModel.value);
				var m = this.utilService.CopyObj(t, ft.listObj.selectedObj);
				ft.formObj.formModel.setValue(m);
			}
		};
	};

}