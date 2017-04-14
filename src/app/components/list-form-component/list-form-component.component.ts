import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	MenuItem,
	ConfirmationService,
	Message
} from 'primeng/primeng';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AuthService,
	CrudService,
	UtilService
} from '../index';
@Component({
	selector: 'app-list-form-component',
	templateUrl: './list-form-component.component.html',
	styleUrls: ['./list-form-component.component.css']
})
export class ListFormComponentComponent implements OnInit {
	//提示信息
	private msgs: Message[] = [];
	private step = 1;
	//详情
	private infoFuncs: MenuItem[];
	private listObj = {};
	private formObj = {};
	private authData = [];
	@Input() statusText;
	@Input() paramFunc;
	@Input() status = [];
	@Input() menus = {};
	@Input() title = "";
	@Input() list = {};
	@Input() form = [];
	@Input() saveStep = true;
	@Output() initEvent: EventEmitter < any > = new EventEmitter();
	@Output() rowSeleted: EventEmitter < any > = new EventEmitter();
	@Output() addEvent: EventEmitter < any > = new EventEmitter();
	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private utilService: UtilService,
		private crudService: CrudService,
		private confirmationService: ConfirmationService
	) {

	};

	ngOnInit() {
		//定义信息操作菜单
		this.infoFuncs = [{
			label: '返回',
			icon: 'fa-backward',
			command: () => {
				this.step = 1;
			}
		}];
		var i = 0;
		for(var k in this.menus) {
			i++;
		};
		if(i <= 0) {
			this.menus = this.getMenus();
		};
	};

	onSubmit(param) {
		//保存数据
		var menu = this.listObj['funcObj']['t_menu'];
		this.paramFunc && (param = this.paramFunc(param));
		this.crudService.SaveData(menu["authUrl"], param, (ret) => {
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: '保存成功'
			});
			this.saveStep && (this.step = 1);
			var value = this.formObj['formModel']['value'];
			if(!value["id"]) {
				value["id"] = ret.data;
				var m = this.utilService.CopyObj(value, value);
				this.formObj['formModel']['setValue'](m);
				m["status"] = this.statusText || this.utilService.GetStatus("0");
				this.listObj['listData'].unshift(m);
			} else {
				for(var k in value) {
					this.listObj['selectedObj'][k] && (this.listObj['selectedObj'][k] = value[k]);
				}
			}
			this.SelectedRow(this.listObj['selectedObj']);
		});
	};
	ListInit(e) {
		this.listObj = e;
		this.initEvent.emit(this);
	};
	FormInit(e) {
		this.formObj = e;
	};
	SelectedRow(e) {
		this.rowSeleted.emit(e);
	};
	private display = false;
	private remark = "";
	private tempFunc;
	Reject() {
		this.tempFunc && this.tempFunc();
		this.display = false;
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
				this.addEvent.emit();
			},
			mod: (auth, ft) => {
				//修改
				var id = ft.listObj.selectedObj.id;
				if(!id) return;
				ft.step = 2;
				if(ft.listObj.selectedObj.status != this.utilService.GetStatus('0') &&
					ft.listObj.selectedObj.status != this.utilService.GetStatus('99')) {
					ft.formObj.canSave = false;
				} else {
					ft.formObj.canSave = true;
				}
				var t = this.utilService.ClearObj(ft.formObj.formModel.value);
				var m = this.utilService.CopyObj(t, ft.listObj.selectedObj);
				ft.formObj.formModel.setValue(m);
				//获取审核记录
				this.crudService.GetData('auth/bill/list.do', {
					id: id
				}, ret => {
					ret = ret.data;
					ft.authData = ret;
				});
				this.addEvent.emit();
			},
			remove: (auth, ft) => {
				//删除
				this.confirmationService.confirm({
					header: '删除提示',
					message: '您确定需要删除此记录?',
					accept: () => {
						var m = ft.listObj.selectedObj;
						this.crudService.DeleteData(
							auth.item.authUrl, m["id"],
							ret => {
								ft.msgs.push({
									severity: 'success',
									summary: '提示',
									detail: "删除成功"
								});
								var index = this.utilService.GetArrayIndex(ft.listObj.listData, "id", m["id"]);
								ft.listObj.listData.splice(index, 1);
								ft.listObj.selectedObj = {};
								this.SelectedRow({});
							});
					}
				});
			},
			app: (auth, ft) => {
				//提交
				this.handerData('提交', auth, ft, '提交成功', '1');
			},
			auth: (auth, ft) => {
				//审核
				this.handerData('审核', auth, ft, '审核通过', '2');
			},
			reject: (auth, ft) => {
				//否决
				this.remark = "";
				this.display = true;
				this.tempFunc = () => {
					var param = {
						id: ft.listObj.selectedObj.id,
						remark: this.remark
					}
					this.sucessBack(auth, ft, '否决成功', '99', param);
				};
			}
		};
	};

	private handerData(handler, auth, ft, msg, status) {
		this.confirmationService.confirm({
			header: handler + '提示',
			message: '您确定' + handler + '此表单?',
			accept: () => {
				var id = ft.listObj.selectedObj.id;
				var param = {
					id: id
				};
				this.sucessBack(auth, ft, msg, status, param);
			}
		});
	};
	private sucessBack(auth, ft, msg, status, param) {
		this.crudService.AppData(
			auth.item.authUrl, param,
			ret => {
				ft.msgs.push({
					severity: 'success',
					summary: '提示',
					detail: msg
				});
				if(ret.data >= 1) {
					ft.listObj.selectedObj.status = this.utilService.GetStatus(status);
					this.SelectedRow(ft.listObj.selectedObj);
				}
			});
	};
}