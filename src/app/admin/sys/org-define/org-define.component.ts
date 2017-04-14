import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute
} from '@angular/router';
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
	OrgDefineService,
	AuthService,
	CrudService
} from '../index';

@Component({
	selector: 'admin-app-org-define',
	templateUrl: './org-define.component.html',
	styleUrls: ['./org-define.component.css']
})
export class OrgDefineComponent implements OnInit {
	//菜单功能临时变量
	private t_menu = {};
	private step = 1;
	private depFuns: MenuItem[] = [];
	private depTrees: TreeNode[];
	private depNode: TreeNode;
	//提示信息
	private msgs: Message[] = [];
	//部门信息
	private orgForm: FormGroup;
	//职务列表
	private jobFuns: MenuItem[] = [];
	private jobTotal = 10;
	private jobList = [];
	private selectedJob = {};
	//职务信息
	private jobInfoFuns: MenuItem[];
	private jobForm: FormGroup;
	//职务权限信息
	private jobAuthTrees: TreeNode[];
	private selectedJobAuthNodes: TreeNode[];
	//用户信息
	private userFuns: MenuItem[] = [];
	private selectedUsers = [];
	private userDisplay = false;
	//可选择用户信息
	private chooseUsers = [];
	private chooseUserList = [];
	private chooseUserTotal = 10;
	//=================================
	constructor(
		private authOrgService: AuthOrgService,
		private utilService: UtilService,
		private fb: FormBuilder,
		private confirmationService: ConfirmationService,
		private orgDefineService: OrgDefineService,
		private authService: AuthService,
		private router: ActivatedRoute,
		private crudService: CrudService
	) {
		this.utilService.loadingCompont = false;
		//定义部门按钮功能
		var menus = {
			add: (auth) => {
				this.t_menu = auth.item;
				this.display = true;
				var m = this.depNode;
				if(!m) {
					return;
				};
				this.orgForm.setValue({
					id: "",
					name: "",
					parentId: m["id"],
					parentName: m["name"]
				});
				this.msgs.push({
					severity: 'success',
					summary: '提示',
					detail: "plus"
				});
			},
			mod: (auth) => {
				if(!this.depNode) return;
				if(!this.depNode.parent) return;
				this.display = true;
				this.t_menu = auth.item;
				var m = this.utilService.CopyObj(this.orgForm.value, this.depNode);
				var parent = this.depNode.parent;
				parent && (m["parentName"] = parent["name"]) && (this.orgForm.setValue(m));
			},
			remove: (auth) => {
				if(!this.depNode) return;
				this.t_menu = auth.item;
				this.confirmationService.confirm({
					header: '删除提示',
					message: '您确定需要删除此记录?',
					accept: () => {
						var id = this.depNode["id"];
						this.crudService.DeleteData(
							auth.item.authUrl, id,
							ret => {
								this.msgs.push({
									severity: 'success',
									summary: '提示',
									detail: "删除成功"
								});
								this.utilService.DeleteTree(this.depTrees, "children", "id", [this.depNode]);
								this.jobList = [];
								this.userList = [];
							});
					}
				});
			}
		};
		//定义职务功能
		var jobMenu = {
			addRole: (auth) => {
				this.t_menu = auth.item;
				this.step = 2;
				//给职务赋值
				var temp = this.depNode;
				var tm = this.utilService.ClearObj(this.jobForm.value);
				temp && (tm["deptId"] = temp["id"]) && (tm["deptName"] = temp["name"]);
				this.jobForm.setValue(tm);
				this.selectedJobAuthNodes = [];
			},
			modRole: (auth) => {
				this.t_menu = auth.item;
				var m = this.selectedJob;
				if(!m["id"]) return;
				this.step = 2;
				//给职务赋值
				var temp = this.depNode;
				var tm = this.utilService.ClearObj(this.jobForm.value);
				m && (tm["id"] = m["id"]) && (tm["name"] = m["name"]);
				temp && (tm["deptId"] = temp["id"]) && (tm["deptName"] = temp["name"]);
				this.jobForm.setValue(tm);
				//获取职务权限信息
				this.orgDefineService.GetDeptRoleAuth(m["id"], (ret) => {
					ret = ret.data;
					var t = this.utilService.GetArray(this.jobAuthTrees, "children", "id", ret);
					this.selectedJobAuthNodes = t;
				});
			},
			removeRole: (auth) => {
				if(!this.selectedJob["id"]) return;
				this.t_menu = auth.item;
				this.confirmationService.confirm({
					header: '删除提示',
					message: '您确定需要删除此记录?',
					accept: () => {
						var id = this.selectedJob["id"];
						this.crudService.DeleteData(
							auth.item.authUrl, id,
							ret => {
								this.msgs.push({
									severity: 'success',
									summary: '提示',
									detail: "删除成功"
								});
								var index = this.utilService.GetArrayIndex(this.jobList, "id", id);
								this.jobList.splice(index, 1);
								this.userList = [];
							});
					}
				});
			}
		};
		//定义人员按钮
		var userMenus = {
			addUser: (auth) => {
				this.t_menu = auth.item;
				this.userDisplay = true;
				this.SearchChooseUser();
			},
			removeUser: (auth) => {
				var ids = this.utilService.GetIds(this.selectedUsers, "id");
				if(!ids) return;
				this.t_menu = auth.item;
				var d = {};
				for(var i in this.selectedUsers) {
					var m = this.selectedUsers[i];
					d[m["id"]] = "Y";
				};
				var temp = [];
				for(var k in this.userList) {
					var m = this.userList[k];
					if(d[m["id"]] == "Y") {
						continue;
					};
					temp.push(m);
				};
				var param = {
					roleId: this.selectedJob["id"],
					userIds: ids
				};
				this.orgDefineService.DeleteRoleUser(
					auth.item.authUrl, param,
					ret => {
						this.userList = temp;
						this.selectedUsers = [];
					});
			}
		};
		//菜单数据
		this.router.queryParams.subscribe((params) => {
			var id = params["id"];
			this.authService.GetAuthFunc(id, (ret) => {
				for(var k in menus) {
					if(ret[k]) {
						var m = ret[k];
						m.command = menus[k];
						this.depFuns.push(m);
					}
				};
				for(var k in jobMenu) {
					if(ret[k]) {
						var m = ret[k];
						m.command = jobMenu[k];
						this.jobFuns.push(m);
					}
				};
				for(var k in userMenus) {
					if(ret[k]) {
						var m = ret[k];
						m.command = userMenus[k];
						this.userFuns.push(m);
					}
				};
			});
		});
	};
	ngOnInit() {
		//定义部门表单
		this.orgForm = this.fb.group({
			'id': new FormControl(''),
			'name': new FormControl('', Validators.required),
			'parentId': new FormControl(''),
			'parentName': new FormControl({
				value: "",
				disabled: true
			})
		});
		//获取部门信息
		this.orgDefineService.GetOrgDefine((ret) => {
			ret = ret.data;
			var data = this.utilService.TransData(ret, "id", "parentId", "children");
			this.depTrees = < TreeNode[] > data;
		});
		//定义职务信息菜单
		this.jobInfoFuns = [{
			label: '返回',
			icon: 'fa-backward',
			command: () => {
				this.step = 1;
			}
		}];
		//定义职务表单
		this.jobForm = this.fb.group({
			'id': new FormControl(''),
			'name': new FormControl('', Validators.required),
			'deptId': new FormControl(''),
			'deptName': new FormControl({
				value: "",
				disabled: true
			})
		});
		//获取权限列表
		this.orgDefineService.GetOrgAuthAllList((ret) => {
			ret = ret.data;
			var data = this.utilService.TransData(ret, "id", "parentId", "children");
			this.jobAuthTrees = < TreeNode[] > data;
		});
	};
	//选择部门======================
	NodeSelect(e) {
		//获取职务列表
		var page = this.utilService.GetPageInfo();
		this.LoadJobListData(page);
		//获取用户列表
		this.LoadUserData(page);

	};
	//部门功能=====================
	private display = false;
	onSubmit(value) {
		//保存数据
		this.crudService.SaveData(this.t_menu["authUrl"], value, (ret) => {
			this.display = false;
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "保存成功"
			});
			if(!value["id"]) {
				value["id"] = ret.data;
				var m = this.utilService.CopyObj(value, value);
				!this.depNode.children && (this.depNode.children = []);
				this.depNode.children.push(m);
			} else {
				for(var k in value) {
					this.depNode[k] = value[k];
				}
			}
		});

	};
	//职务信息==========================
	//获取机构信息
	LoadJobListData(e) {
		this.selectedJob = {};
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		this.depNode && (param["deptId"] = this.depNode["id"]);
		this.orgDefineService.GetJobList(param, (ret) => {
			ret = ret.data;
			this.jobTotal = ret.total;
			this.jobList = ret.rows;
		});
	};
	//获取机构的权限信息
	JobClick(m) {
		this.selectedJob = m;
		var page = this.utilService.GetPageInfo();
		this.LoadUserData(page);
	};
	//搜索
	private jobKeyword = "";
	SearchJob() {
		//TODO
		this.msgs.push({
			severity: 'success',
			summary: '提示',
			detail: this.jobKeyword
		});
	};
	//===============================
	//用户列表信息====================
	private userList = [];
	private userTotals = 10;
	LoadUserData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		if(!this.depNode) return;
		this.depNode && (param["deptId"] = this.depNode["id"]);
		this.selectedJob && (param["roleId"] = this.selectedJob["id"]);
		this.orgDefineService.GetDepUserList(param, (ret) => {
			ret = ret.data;
			this.userList = ret.rows;
			this.userTotals = ret.total;
		});

	};
	//获取可选择用户列表信息
	LoadChooseUserData(e) {
		var param = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		this.selectedJob && (param["roleId"] = this.selectedJob["id"]);
		e.keyword && (param["keyword"] = e.keyword);
		this.orgDefineService.GetRoleUserSelect(param, (ret) => {
			ret = ret.data;
			this.chooseUserList = ret.rows;
			this.chooseUserTotal = ret.total;
		});
	};
	//搜索可选择用户信息
	private userKeyword = "";
	SearchChooseUser() {
		var page = this.utilService.GetPageInfo();
		page["keyword"] = this.userKeyword;
		this.LoadChooseUserData(page);
	};
	//选择用户后确定按钮 
	ChooseUser() {
		this.userDisplay = false;
		var ids = this.utilService.GetIds(this.chooseUsers, "id");
		if(!ids) return;
		var param = {
			roleId: this.selectedJob["id"],
			userIds: ids
		};
		this.crudService.SaveData(this.t_menu["authUrl"], param, (ret) => {
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "ChooseUser"
			});
			for(var k in this.chooseUsers) {
				var m = this.chooseUsers[k];
				this.userList.unshift(m);
			};
			this.chooseUsers = [];
		});

	};
	//保存权限信息
	SaveDeptRoleAuth(value) {
		var param = this.utilService.CopyObj(value, value);
		var ids = this.utilService.GetIds(this.selectedJobAuthNodes, "id");
		param["authIds"] = ids;
		//保存数据
		this.crudService.SaveData(this.t_menu["authUrl"], param, (ret) => {
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "保存成功"
			});
			this.step = 1;
			if(!value["id"]) {
				value["id"] = ret.data;
				this.jobList.unshift(value);
			} else {
				for(var k in value) {
					this.selectedJob[k] && (this.selectedJob[k] = value[k]);
				}
			}
		});
	};
}