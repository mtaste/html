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
	Message
} from 'primeng/primeng';
import {
	AuthDefineService,
	UtilService,
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AuthService
} from '../index';

@Component({
	selector: 'app-auth-define',
	templateUrl: './auth-define.component.html',
	styleUrls: ['./auth-define.component.css']
})
export class AuthDefineComponent implements OnInit {
	private saveFunc = {};
	private trees: TreeNode[];
	private selectedNode: TreeNode;
	private items: MenuItem[] = [];
	private msgs: Message[] = [];
	private authTypes = [];
	private mgTypes = [];
	constructor(
		private authDefineService: AuthDefineService,
		private utilService: UtilService,
		private fb: FormBuilder,
		private confirmationService: ConfirmationService,
		private router: ActivatedRoute,
		private authService: AuthService
	) {
		this.utilService.loadingCompont = false;
		var menus = {
			add: (auth) => {
				var m = this.selectedNode;
				var tm = this.utilService.ClearObj(this.authForm.value);
				tm["parentId"] = m["id"];
				tm["parentName"] = m["name"];
				this.authForm.setValue(tm);
			},
			remove: (auth) => {
				this.confirmationService.confirm({
					header: '删除提示',
					message: '您确定需要删除此记录?',
					accept: () => {
						this.authDefineService.DeleteData(
							auth.item.authUrl,
							this.selectedNode["id"],
							ret => {
								this.utilService.DeleteTree(this.trees, "children", "id", [this.selectedNode]);
							});
					}
				});
			}
		};
		//菜单数据
		this.router.queryParams.subscribe((params) => {
			var id = params["id"];
			this.authService.GetAuthFunc(id, (ret) => {
				this.saveFunc = ret["mod"];
				for(var k in ret) {
					if(menus[k]) {
						var m = ret[k];
						m.command = menus[k];
						this.items.push(m);
					}
				}
			});
		});
	};
	ngOnInit() {
		//初始化权限表单
		this.authForm = this.fb.group({
			'id': new FormControl(''),
			'parentId': new FormControl(''),
			'parentName': new FormControl({
				value: "",
				disabled: true
			}),
			'name': new FormControl('', Validators.required),
			'authType': new FormControl('', Validators.required),
			'mgType': new FormControl('', Validators.required),
			'authUrl': new FormControl(''),
			'authValue': new FormControl(''),
			'authIcon': new FormControl(''),
			'seq': new FormControl('')
		});
		//获取定义的数据
		this.authDefineService.GetAuthDefineList((ret) => {
			ret = ret.data;
			var data = this.utilService.TransData(ret, "id", "parentId", "children");
			this.trees = < TreeNode[] > data;
		});
		//下拉数据
		this.authTypes.push({
			label: '请选择',
			value: ''
		});
		this.authTypes.push({
			label: '菜单',
			value: '1'
		});
		this.authTypes.push({
			label: '功能',
			value: '2'
		});
		//下拉2
		this.mgTypes.push({
			label: '请选择',
			value: ''
		});
		this.mgTypes.push({
			label: '是',
			value: '1'
		});
		this.mgTypes.push({
			label: '否',
			value: '-1'
		});
	};
	//select tree
	NodeSelect(e, a) {
		var m = this.utilService.CopyObj(this.authForm.value, e.node);
		e.node.parent && (m["parentName"] = e.node.parent.name);
		!e.node.parent && (m["parentName"] = "0");
		this.authForm.setValue(m);
	};
	//Form
	authForm: FormGroup;
	onSubmit(value) {
		this.authDefineService.SaveData(this.saveFunc["authUrl"], value, (ret) => {
			//成功增加后,提示信息,以及动态增加
			this.msgs.push({
				severity: 'success',
				summary: '提示',
				detail: '操作成功!'
			});
			if(!value["id"]) {
				value["id"] = ret.data;
				var m = this.utilService.CopyObj(value, value);
				!this.selectedNode.children && (this.selectedNode.children = []);
				this.selectedNode.children.push(m);
			} else {
				for(var k in value) {
					this.selectedNode[k] = value[k];
				}
			};
		});

	}
	get display() {
		return ""; //JSON.stringify(this.authForm.value);
	}
}