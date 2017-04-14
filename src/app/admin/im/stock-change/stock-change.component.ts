import {
	Component,
	OnInit
} from '@angular/core';
import {
	UtilService,
	Validators
} from '../index';
@Component({
	selector: 'app-stock-change',
	templateUrl: './stock-change.component.html',
	styleUrls: ['./stock-change.component.css']
})
export class StockChangeComponent implements OnInit {
	private status = [];
	private obj = {};
	//列表
	private listModel = {};
	//填写信息
	private form = [];
	//产品列表
	private productModel = {};
	private selectUrls = {
		add: 'im/product/change/addDetail.do',
		remove: 'im/product/change/removeDetail.do'
	};
	constructor(
		private utilService: UtilService
	) {
		this.utilService.loadingCompont = false;
		this.form = this.getFormModel();
		//list model
		this.listModel = this.getListModel();
		//product model
		this.productModel = this.getProductModel();
		//status 
		this.status = this.utilService.GetStatusTab(['0', '1', '2', '99'], false);
	};

	ngOnInit() {

	};

	private getFormModel() {
		return [{
			model: 'id'
		}, {
			name: '标题',
			model: 'title',
			vali: Validators.required,
			msg: "标题不能为空"
		}, {
			name: '备注',
			model: 'remark',
			type: 'textarea'
		}];
	};

	private getListModel() {
		return {
			url: 'im/product/change/list.json',
			model: [{
				field: 'title',
				header: '标题'
			}, {
				field: 'status',
				header: '状态'
			}]
		};
	}

	private getProductModel() {
		return {
			listUrl: 'im/product/change/detail.do',
			listModel: [{
				field: 'name',
				header: '产品名称'
			}, {
				field: 'selfNum',
				header: '自定编号'
			}, {
				field: 'qty',
				header: '数量'
			}],
			chooseUrl: "im/product/change/productList.do",
			chooseModel: [{
				field: 'name',
				header: '产品名称'
			}, {
				field: 'selfNum',
				header: '自定编号'
			}],
			editUrl: 'im/product/change/detailQty.do',
			editForm: [{
				model: 'id'
			}, {
				name: '数量',
				model: 'qty',
				type: 'number'
			}, {
				model: 'name',
				name: "名称",
				display: true
			}]
		};
	};
}