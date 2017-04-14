import {
	Component,
	OnInit
} from '@angular/core';
import {
	TreeNode,
	MenuItem,
	ConfirmationService,
	Message,
	SelectItem
} from 'primeng/primeng';
import {
	AuthOrgService,
	UtilService,
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	MgOrgService,
	CrudService
} from '../../index';
@Component({
	selector: 'app-org-auth',
	templateUrl: './org-auth.component.html',
	styleUrls: ['./org-auth.component.css']
})
export class OrgAuthComponent implements OnInit {
	private status = [];
	//提示信息
	private authData = [];
	private msgs: Message[] = [];
	private step = 1;
	private model = {};
	private canSave = false;
	//详情
	private infoFuncs: MenuItem[];
	private billForm: FormGroup;
	//权限信息
	private orgAuthTrees: TreeNode[];
	private selectedOrgAuthNodes: TreeNode[];
	constructor(
		private confirmationService: ConfirmationService,
		private mgOrgService: MgOrgService,
		private utilService: UtilService,
		private fb: FormBuilder,
		private crudService: CrudService
	) {
		this.utilService.loadingCompont = false;
		//status 
		this.status = this.utilService.GetStatusTab(['0', '1', '2', '99'],false);
	};

	ngOnInit() { //定义表单
		this.billForm = this.fb.group({
			'id': new FormControl(''),
			'orgId': new FormControl(''),
			'name': new FormControl({
				disabled: true,
				value: ""
			}),
			'flag': new FormControl({
				disabled: true,
				value: ""
			}),
			'authType': new FormControl('', Validators.required)
		});
		//定义信息操作菜单
		this.infoFuncs = [{
			label: '返回',
			icon: 'fa-backward',
			command: () => {
				this.step = 1;
			}
		}];
		//获取机构可授权权限列表
		this.mgOrgService.GetCanAuthList((ret) => {
			ret = ret.data;
			var data = this.utilService.TransData(ret, "id", "parentId", "children");
			this.orgAuthTrees = < TreeNode[] > data;
		});
		//下拉2
		this.authTypes.push({
			label: '请选择',
			value: ''
		});
		this.authTypes.push({
			label: '新增',
			value: '1'
		});
		this.authTypes.push({
			label: '删除',
			value: '-1'
		});
	};
	//保存单据数据
	SaveOrgAuth() {
		var value = this.billForm.value;
		var param = this.utilService.CopyObj(value, value);
		var ids = this.utilService.GetIds(this.selectedOrgAuthNodes, "id");
		param["authIds"] = ids;
		//保存数据
		var item = this.listObj['funcObj']['t_menu'];
		this.crudService.SaveData(item["authUrl"], param, (ret) => {
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "保存成功"
			});
			this.step = 1;
			value = this.model;
			value['status'] = this.utilService.GetStatus('0');
			if(!value["id"]) {
				value["id"] = ret.data;
				this.listObj['listData'].unshift(value);
			} else {
				for(var k in value) {
					this.listObj['selectedObj'][k] && value[k] && (this.listObj['selectedObj'][k] = value[k]);
				}
			}
			this.SelectedRow(this.listObj['selectedObj']);
		});
	};
	//选择机构
	private orgDisplay = false;
	private orgKeyword = "";
	private chooseOrgList = [];
	private chooseOrg = {};
	private chooseOrgTotal = 10;
	SearchChooseOrg() {
		var page = this.utilService.GetPageInfo();
		this.LoadChooseOrgData(page);
	};
	LoadChooseOrgData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		this.orgKeyword && (param['keyword'] = this.orgKeyword);
		this.mgOrgService.GetChooseOrgList(param, (ret) => {
			ret = ret.data;
			this.chooseOrgList = ret.rows;
			this.chooseOrgTotal = ret.total;
		});
	};
	ChooseOrg() {
		if(!this.chooseOrg || !this.chooseOrg['id']) {
			return;
		};
		var m = {
			id: this.billForm.value['id'],
			authType: this.billForm.value['authType'],
			orgId: this.chooseOrg['id'],
			name: this.chooseOrg['name'],
			flag: this.chooseOrg['flag']
		};
		this.model = m;
		this.billForm.setValue(m);
		this.orgDisplay = false;
	};
	/////////
	private listModel = this.getListModel();
	private listObj = {};
	private menus = this.getMenus();
	private display = false;
	private remark = "";
	private tempFunc;
	private authTypes = [];
	Reject() {
		this.tempFunc && this.tempFunc();
		this.display = false;
	};
	ListInit(e) {
		this.listObj = e;
		e.funcObj.RestFuncs(['add']);
	};
	SelectedRow(data) {
		var f = this.listObj['funcObj'];
		if(!data && data.id) {
			f.RestFuncs(['add', 'mod']);
			return;
		};
		this.canSave = false;
		if(data.status == this.utilService.GetStatus('0')) {
			this.canSave = true;
			f.RestFuncs(['add', 'mod', 'app', 'remove']);
		} else if(data.status == this.utilService.GetStatus('1')) {
			f.RestFuncs(['add', 'mod', 'auth', 'reject']);
		} else {
			f.RestFuncs(['add', 'mod']);
		}
		if(data.status == this.utilService.GetStatus('99')) {
			this.canSave = true;
		}
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
	getListModel() {
		return {
			url: 'mg/org/authBill/list.json',
			model: [{
				field: 'name',
				header: '名称'
			}, {
				field: 'flag',
				header: '标示'
			}, {
				field: 'updateUser',
				header: '处理人'
			}, {
				field: 'status',
				header: '状态'
			}]
		};
	};
	getFormModel() {
		var model = {
			id: "",
			authType: "",
			orgId: "",
			name: "",
			flag: ""
		};
		return model;
	};
	getMenus() {
		return {
			add: (auth, ft) => {
				this.step = 2;
				var m = this.utilService.ClearObj(this.billForm.value);
				m["name"] = "";
				m["flag"] = "";
				this.billForm.setValue(m);
				this.selectedOrgAuthNodes = [];
				ft.authData = [];
				this.canSave = true;
			},
			mod: (auth, ft) => {
				this.step = 2;
				var m = this.utilService.CopyObj(this.getFormModel(), ft.listObj.selectedObj);
				this.model = m;
				this.billForm.setValue(m);
				//获取表单权限信息
				var id = ft.listObj.selectedObj.id;
				this.mgOrgService.GetBillDetail(id, (ret) => {
					ret = ret.data;
					var t = this.utilService.GetArray(this.orgAuthTrees, "children", "id", ret);
					this.selectedOrgAuthNodes = t;
				});
				//获取审核记录
				this.crudService.GetData('auth/bill/list.do', {
					id: id
				}, ret => {
					ret = ret.data;
					ft.authData = ret;
				});
			},
			remove: (auth, ft) => {
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

}