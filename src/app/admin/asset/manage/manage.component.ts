import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	Validators,
	UtilService,
	CrudService
} from '../index';
import {
	Message
} from 'primeng/primeng';
@Component({
	selector: 'asset-app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
	private msgs: Message[] = [];
	private step = 1;
	private menuObj;
	private menus = {};
	private infoFuncs = [];
	private funs = [];
	private selectData = [];
	private selectedObjs = [];
	private loanData = [];
	private loanTotals;
	private canFlag;
	//选择
	private chooseModel = [];
	private chooseURL = "asset/manage/user-choose.json";

	//列表
	private listModel = {};
	@ViewChild('listObj') listObj;
	@ViewChild('selectObj') selectObj;

	constructor(
		private utilService: UtilService,
		private crudService: CrudService
	) {
		this.utilService.loadingCompont = false;
		//list model
		this.listModel = this.getListModel();
		//select model
		this.chooseModel = this.getSelectModel();
		//菜单
		this.menus = {
			mod: (e) => {
				if(!this.checkSelectObj(e.item)) return;
				this.step = 2;
				var page = this.utilService.GetPageInfo();
				this.canFlag = "loan";
				this.LoadLoanData(page);
			},
			loan: (e) => {
				if(!this.checkSelectObj(e.item)) return;
				this.step = 3;
				this.selectData = [];
				this.selectedObjs = [];
			},
			revert: (e) => {
				if(!this.checkSelectObj(e.item)) return;
				this.step = 4;
				var page = this.utilService.GetPageInfo();
				this.canFlag = "revert";
				this.LoadRevertData(page);
			},
			bad: (e) => {
				if(!this.checkSelectObj(e.item)) return;
				this.step = 5;
			}
		};
		this.funs.push({
			label: "新增",
			icon: "fa-plus",
			command: (auth) => {
				this.selectObj.display = true;
				this.selectObj.chooseObjs = [];
				this.selectObj.SearchChooseList();
			}
		});
		this.funs.push({
			label: "删除",
			icon: "fa-remove",
			command: (auth) => {
				var ids = this.utilService.GetIds(this.selectedObjs, "id");
				var ret = [];
				for(var k in this.selectData) {
					var t = this.selectData[k];
					var id = t['id'];
					if(ids.indexOf(id) < 0) {
						ret.push(t);
					};
				};
				this.selectData = ret;
			}
		});
	};
	private authInfo;
	//统一功能函数
	checkSelectObj(auth) {
		if(!this.listObj.selectedObj || !this.listObj.selectedObj.id) return false;
		this.authInfo = auth;
		return true;
	};
	ngOnInit() {
		this.infoFuncs = [{
			label: '返回',
			icon: 'fa-backward',
			command: () => {
				this.step = 1;
			}
		}];
	};
	getParam(e) {
		return {
			page: e.first / e.rows + 1,
			rows: e.rows,
			id: this.listObj.selectedObj.id
		};
	};
	//查看
	LoadLoanData(e) {
		if('loan' != this.canFlag) return;
		var param = this.getParam(e);
		this.crudService.GetData(this.authInfo.authUrl, param, (ret) => {
			ret = ret.data;
			this.loanData = ret.rows;
			this.loanTotals = ret.total;
		});
	};
	//借出
	submitLoad() {
		//check qty;
		var cn = 0;
		var userIds = "";
		for(var k in this.selectData) {
			var t = this.selectData[k];
			var qty = parseInt(t['qty']);
			if(isNaN(qty)) {
				alert('数量请输入数字.');
				return;
			};
			cn += qty;
			userIds = userIds + t['id'] + "," + qty + ";"
		};
		//提交
		if(cn > this.listObj.selectedObj.qty - this.listObj.selectedObj.loanQty) {
			alert("借出总数量大于库存数量,不能借出.");
			return;
		};
		if(confirm("确定借出此资产?")) {
			var param = {
				id: this.listObj.selectedObj.id,
				userIds: userIds
			};
			this.crudService.SaveData(this.authInfo.authUrl, param, (ret) => {
				this.msgs.push({
					severity: 'success',
					summary: '提示',
					detail: "借出成功"
				});
				this.step = 1;
				this.listObj.Search();
			});
		};
	};
	SelectedRow(e) {

	};
	//归还
	private revertData = [];
	private revertTotals;
	private loanCan;
	LoadRevertData(e) {
		if('revert' != this.canFlag) return;
		var param = this.getParam(e);
		this.crudService.GetData("asset/manage/revert-detail", param, (ret) => {
			ret = ret.data;
			this.revertData = ret.rows;
			this.revertTotals = ret.total;
		});
	};
	//归还
	RevertData(indx) {
		if(confirm('确定归还此借出资产?')) {
			var param = {
				assetId: this.listObj.selectedObj.id,
				id: this.revertData[indx]['id']
			};
			this.crudService.SaveData(this.authInfo.authUrl, param, (ret) => {
				this.msgs.push({
					severity: 'success',
					summary: '提示',
					detail: "归还成功"
				});
				var page = this.utilService.GetPageInfo();
				this.LoadRevertData(page);
			});
		}
	};

	chooseEvent(m) {
		var temp = {};
		for(var k in this.selectData) {
			var t = this.selectData[k];
			temp[t['id']] = "Y";
		};

		for(var k in this.selectObj.chooseObjs) {
			var t = this.selectObj.chooseObjs[k];
			if(!temp[t['id']]) {
				t['qty'] = '1';
				this.selectData.push(t);
			}
		};

	};
	getSelectModel() {
		return [{
			field: 'userName',
			header: '用户名'
		}, {
			field: 'name',
			header: '姓名'
		}];
	};
	getListModel() {
		return {
			url: 'asset/manage/list.json',
			model: [{
				field: 'assetNum',
				header: '资产编号'
			}, {
				field: 'name',
				header: '资产名称'
			}, {
				field: 'qty',
				header: '资产总数量'
			}, {
				field: 'loanQty',
				header: '已借数量'
			}]
		};
	};
}