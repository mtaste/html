import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService
} from '../index';
@Component({
	selector: 'oa-app-notice',
	templateUrl: './notice.component.html',
	styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
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
			name: '标题',
			model: 'title',
			vali: Validators.required,
			msg: "标题不能为空"
		}, {
			name: '内客',
			model: 'content',
			type: 'textarea',
			vali: Validators.required,
			msg: "标题不能为空"
		}];
	};
	getListModel() {
		return {
			url: 'oa/notice/list.json',
			model: [{
				field: 'title',
				header: '标题'
			}, {
				field: 'status',
				header: '状态'
			}, {
				field: 'createTime',
				header: '创建时间'
			}, {
				field: 'createUser',
				header: '创建人'
			}, ]
		};
	};

}