import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService
} from '../index';
@Component({
	selector: 'asset-app-check-in',
	templateUrl: './check-in.component.html',
	styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
	private status = [];
	private obj = {};
	//列表
	private listModel = {};
	//填写信息
	private form = [];
	constructor(private utilService: UtilService) {
		this.utilService.loadingCompont = false;
		this.form = this.getFormModel();
		//list model
		this.listModel = this.getListModel();
		//status 
		this.status = this.utilService.GetStatusTab(['0', '1'], false);
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
	ngOnInit() {};

	getFormModel() {
		return [{
			model: 'id'
		}, {
			name: '资产编号',
			model: 'assetNum',
			vali: Validators.required,
			msg: "资产编号不能为空"
		}, {
			name: '资产名称',
			model: 'name',
			vali: Validators.required,
			msg: "资产名称不能为空"
		}, {
			name: '资产数量',
			model: 'qty',
			type: 'number',
			vali: Validators.required,
			msg: "资产数量不能为空"
		}, {
			name: '备注',
			model: 'remark',
			type: 'textarea'
		}];
	};
	getListModel() {
		return {
			url: 'asset/check-in/list.json',
			model: [{
				field: 'assetNum',
				header: '资产编号'
			}, {
				field: 'name',
				header: '资产名称'
			}, {
				field: 'qty',
				header: '资产数量'
			}, {
				field: 'status',
				header: '状态'
			}, {
				field: 'createTime',
				header: '创建时间'
			}, {
				field: 'createUser',
				header: '创建人'
			}]
		};
	};

}