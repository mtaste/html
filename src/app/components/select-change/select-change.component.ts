import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	CrudService,
	UtilService
} from '../index';
@Component({
	selector: 'app-select-change',
	templateUrl: './select-change.component.html',
	styleUrls: ['./select-change.component.css']
})
export class SelectChangeComponent implements OnInit {
	private obj = {};
	@Input() status = [];
	//列表
	@Input() listModel = {};
	@Input() listTile;
	@Input() selectTile;
	//填写信息
	@Input() form = [];
	//选择列表
	@Input() selectModel = {};
	@Input() selectUrls = {};
	constructor(
		private utilService: UtilService,
		private crudService: CrudService
	) {
		this.utilService.loadingCompont = false;
	};

	ngOnInit() {

	};

	InitListForm(e) {
		this.obj = e;
		e.listObj.funcObj.RestFuncs(['add']);
	};
	RowSeleted(data) {
		var f = this.obj['listObj']['funcObj'];
		if(!data && data.id) {
			f.RestFuncs(['add', 'mod']);
			return;
		};
		if(data.status == this.utilService.GetStatus('0')) {
			f.RestFuncs(['add', 'mod', 'app', 'remove']);
		} else if(data.status == this.utilService.GetStatus('1')) {
			f.RestFuncs(['add', 'mod', 'auth', 'reject']);
		} else {
			f.RestFuncs(['add', 'mod']);
		}
	};
	AddEvent(e) {
		this.selectListObj['showFuns'] = this.obj['formObj']['canSave'];
		this.ChangeBillId();
	};
	private selectListObj = {};
	InitSelectListEvent(e) {
		this.selectListObj = e;
	};
	private ChangeBillId() {
		var f = this.obj['formObj'];
		var value = f.formModel.value;
		this.selectListObj['Id'](value.id);
	};
	getParam(e) {
		this.ChangeBillId();
		var f = this.obj['formObj'];
		var value = f.formModel.value;
		if(!value.id) {
			alert('请先保存再操作.');
			return;
		};
		var param = {
			id: value.id,
			selectIds: e.ids
		}
		return param;
	};
	detailHandler(url, e) {
		var p = this.getParam(e);
		if(!p) return;
		this.crudService.SaveData(url, p, (ret) => {
			e && e.bk && e.bk();
		});
	}
	RemoveEvent(e) {
		var url = this.selectUrls['remove'];
		this.detailHandler(url, e);
	};

	ChooseEvent(e) {
		var url = this.selectUrls['add'];
		this.detailHandler(url, e);
	};

}