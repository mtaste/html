import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService
} from '../index';
@Component({
	selector: 'mms-app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
	private status = [];
	//列表
	private listModel = {};
	//填写信息
	private form = [];
	constructor(private utilService: UtilService) {
		this.utilService.loadingCompont = false;
		this.status = this.utilService.GetStatusTab(['10', '-1', '11'], false);
		this.form = this.getFormModel();
		//list model
		this.listModel = this.getListModel();
	};
	ngOnInit() {};

	private getFormModel() {
		var s = this.utilService.GetStatusTab(['10', '-1', '11'], true);
		return [{
			model: 'id'
		}, {
			name: '会员账户',
			model: 'userName',
			vali: Validators.required,
			msg: "用户名不能为空"
		}, {
			name: '姓名',
			model: 'name',
			vali: Validators.required,
			msg: "地址不能为空"
		}, {
			name: '电话',
			model: 'mobile',
			vali: [Validators.required],
			msg: "电话号码有误"
		}, {
			name: '状态',
			model: 'status',
			type: 'select',
			ele: s,
			vali: [Validators.required],
			msg: "状态有误"
		}, {
			name: '地址',
			model: 'address',
			type: 'textarea'
		}];
	};

	private getListModel() {
		return {
			url: 'mms/info/list.json',
			model: [{
				field: 'userName',
				header: '会员账户'
			}, {
				field: 'name',
				header: '姓名'
			}, {
				field: 'mobile',
				header: '电话'
			}, {
				field: 'address',
				header: '地址'
			}, {
				field: 'points',
				header: '积分'
			}, {
				field: 'createUser',
				header: '创建人'
			}, {
				field: 'createTime',
				header: '创建时间'
			}, {
				field: 'statusText',
				header: '状态'
			}]
		};
	}
}