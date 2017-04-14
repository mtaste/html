import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService
} from '../index';
@Component({
	selector: 'app-book-in',
	templateUrl: './book-in.component.html',
	styleUrls: ['./book-in.component.css']
})
export class BookInComponent implements OnInit {
	//列表
	private listModel = {};
	//填写信息
	private form = [];
	constructor(private utilService: UtilService) {
		this.utilService.loadingCompont = false;
		this.form = this.getFormModel();
		//list model
		this.listModel = this.getListModel();
	};

	ngOnInit() {};

	private getFormModel() {
		return [{
			model: 'id'
		}, {
			name: '产品名称',
			model: 'name',
			vali: Validators.required,
			msg: "名称不能为空"
		}, {
			name: '自定编号',
			model: 'selfNum'
		}, {
			name: '产品描述',
			model: 'depict',
			vali: Validators.required,
			msg: "产品描述不能为空",
			type: 'textarea'
		}, {
			name: '备注',
			model: 'remark',
			type: 'textarea'
		}];
	};

	private getListModel() {
		return {
			url: 'im/product/book-in/list.json',
			model: [{
				field: 'name',
				header: '产品名称'
			}, {
				field: 'selfNum',
				header: '自定编号'
			}, {
				field: 'depict',
				header: '产品描述'
			}, {
				field: 'qty',
				header: '库存'
			}]
		};
	}

}