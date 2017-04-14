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
	AuthService,
	CrudService
} from '../index';

@Component({
	selector: 'app-auth-org',
	templateUrl: './auth-org.component.html',
	styleUrls: ['./auth-org.component.css']
})
export class AuthOrgComponent implements OnInit {
	//权限树
	private trees: TreeNode[];
	private selectedNodes: TreeNode[];
	//菜单
	private orgItems: MenuItem[] = [];
	//提示信息
	private msgs: Message[] = [];
	//机构列表
	private totalRecords = 10;
	private orgList = [];
	private selectedOrg = {};
	//机构信息
	private orgForm: FormGroup;
	//菜单功能临时变量
	private t_menu = {};
	//权限保存
	private saveFunc = {};

	constructor(
		private authOrgService: AuthOrgService,
		private utilService: UtilService,
		private fb: FormBuilder,
		private confirmationService: ConfirmationService,
		private router: ActivatedRoute,
		private authService: AuthService,
		private crudService: CrudService
	) {
		this.utilService.loadingCompont = false;
		var menus = {
			add: (auth) => {
				this.t_menu = auth.item;
				this.display = true;
				this.orgForm.setValue({
					id: "",
					name: "",
					flag: ""
				});
			},
			mod: (auth) => {
				this.t_menu = auth.item;
				this.display = true;
				var m = this.utilService.CopyObj(this.orgForm.value, this.selectedOrg);
				this.orgForm.setValue(m);
			},
			remove: (auth) => {
				this.t_menu = auth.item;
				this.confirmationService.confirm({
					header: '删除提示',
					message: '您确定需要删除此记录?',
					accept: () => {
						var id = this.selectedOrg["id"];
						this.crudService.DeleteData(
							auth.item.authUrl, id,
							ret => {
								this.msgs.push({
									severity: 'success',
									summary: '提示',
									detail: "删除成功"
								});
								var index = this.utilService.GetArrayIndex(this.orgList, "id", id);
								this.orgList.splice(index, 1);
								this.selectedNodes = [];
								this.selectedOrg = {};
							});
					}
				});
			}
		};
		//菜单数据
		this.router.queryParams.subscribe((params) => {
			var id = params["id"];
			this.authService.GetAuthFunc(id, (ret) => {
				this.saveFunc = ret.save;
				for(var k in ret) {
					if(menus[k]) {
						var m = ret[k];
						m.command = menus[k];
						this.orgItems.push(m);
					}
				}
			});
		});
	};
	ngOnInit() {
		//定义提交表单
		this.orgForm = this.fb.group({
			'id': new FormControl(''),
			'name': new FormControl('', Validators.required),
			'flag': new FormControl('', Validators.required)
		});
		//获取定义的数据
		this.authOrgService.GetAuthOrgList((ret) => {
			ret = ret.data;
			var data = this.utilService.TransData(ret, "id", "parentId", "children");
			this.trees = < TreeNode[] > data;
		});
	};
	//select tree
	NodeSelect(e) {

	};
	//获取机构信息
	LoadOrgListData(e) {
		var page = {
			page: e.first / e.rows + 1,
			rows: e.rows
		};
		this.keyword && (page['keyword'] = this.keyword);
		this.authOrgService.GetOrgList(page, (ret) => {
			ret = ret.data;
			this.totalRecords = ret.total;
			this.orgList = ret.rows;
		});
	};
	//获取机构的权限信息
	OrgClick(m) {
		this.selectedNodes = [];
		this.selectedOrg = m;
		this.authOrgService.GetOrgAuth(m['id'], (ret) => {
			var t = this.utilService.GetArray(this.trees, "children", "id", ret);
			this.selectedNodes = t;
		});
	};
	//搜索
	private keyword = "";
	SearchOrg() {
		var page = this.utilService.GetPageInfo();
		this.LoadOrgListData(page);
	};
	//新增
	private display = false;
	onSubmit(value) {
		//保存数据
		this.crudService.SaveData(this.t_menu["authUrl"], value, (ret) => {
			this.display = false;
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "新增机构成功"
			});
			if(!value["id"]) {
				value["id"] = ret.data;
				this.orgList.unshift(value);
			} else {
				for(var k in value) {
					this.selectedOrg[k] = value[k];
				}
			}
		});
	};
	//保存机构权限
	SaveAuth() {
		if(!this.selectedOrg['id']) return;
		var ids = this.utilService.GetIds(this.selectedNodes, "id");
		var param = {
			orgId: this.selectedOrg['id'],
			authIds: ids
		};
		var ul = this.saveFunc["authUrl"];
		this.crudService.SaveData(ul, param, (ret) => {
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: "权限保存成功"
			});
		});
	};
}