import {
	Component,
	OnInit
} from '@angular/core';
import {
	CrudService,
	UtilService,
	Validators
} from '../index';
import {
	Md5
} from "ts-md5/dist/md5";
@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
	private infoDisplay = false;
	private passWordDisplay = false;
	private info = [];
	private userInfo;
	private infoForm = [];
	private passWordForm = [];
	private infoObj;
	private passWordObj;
	constructor(
		private crudService: CrudService,
		private utilService: UtilService) {
		this.utilService.loadingCompont = false;
		this.infoForm = this.getInfoFormModel();
		this.passWordForm = this.getPassWordFormModel();
	};

	ngOnInit() {
		this.crudService.GetData('user/info', {}, (ret) => {
			ret = ret.data;
			this.userInfo = ret.data;
			var names = {
				userName: '用户名',
				name: '姓名',
				points: '积分',
				mobile: '联系电话',
				address: '地址',
				status: '状态'
			};
			for(var k in names) {
				var m = {
					name: names[k],
					model: ret[k],
					key: k
				};
				this.info.push(m);
			};
			var t = this.infoObj['formModel']['value'];
			var mt = this.utilService.CopyObj(t, ret);
			this.infoObj['formModel']['setValue'](mt);
			this.passWordObj['formModel']['setValue']({
				passWord: "",
				newPassWord: ""
			});
		});

	};
	private getPassWordFormModel() {
		return [{
			name: '原密码',
			model: 'passWord',
			type: "password",
			vali: [Validators.required, Validators.minLength(6)],
			msg: "最小6位"
		}, {
			name: '新密码',
			model: 'newPassWord',
			type: "password",
			vali: [Validators.required, Validators.minLength(6)],
			msg: "最小6位"
		}];
	};
	private getInfoFormModel() {
		return [{
			name: '姓名',
			model: 'name',
			vali: Validators.required,
			msg: "名称不能为空"
		}, {
			name: '地址',
			model: 'address',
			vali: Validators.required,
			msg: "地址不能为空"
		}, {
			name: '电话',
			model: 'mobile',
			vali: [Validators.required],
			msg: "电话号码有误"
		}];
	};

	ShowInfo() {
		this.infoDisplay = true;
	};
	ShowPassWord() {
		this.passWordDisplay = true;
	};
	onInfoSubmit(e) {
		this.crudService.SaveData('user/change-info', e, (ret) => {
			this.infoDisplay = false;
			for(var k in this.info) {
				var t = this.info[k];
				if(e[t.key]) {
					t.model = e[t.key];
				}
			}
		});

	};
	onPassWordSubmit(e) {
		var param = {
			passWord: Md5.hashStr(e.passWord).toString(),
			newPassWord: Md5.hashStr(e.newPassWord).toString()
		}
		this.crudService.SaveData('user/change-password', param, (ret) => {
			alert('修改成功!');
			this.passWordDisplay = false;
		});
	};
	FormInfoInit(e) {
		this.infoObj = e;
	};
	FormPassWordInit(e) {
		this.passWordObj = e;
	};
}