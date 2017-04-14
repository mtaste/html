import {
	Component,
	OnInit
} from '@angular/core';
import {
	CrudService,
	UtilService
} from '../../index';
@Component({
	selector: 'app-org-info',
	templateUrl: './org-info.component.html',
	styleUrls: ['./org-info.component.css']
})
export class OrgInfoComponent implements OnInit {
	private info = [];
	constructor(
		private crudService: CrudService,
		private utilService: UtilService) {
		this.utilService.loadingCompont = false;
	};

	ngOnInit() {
		this.crudService.GetData('org/info', {}, (ret) => {
			ret = ret.data;
			var names = {
				name: '名称',
				address: '地址',
				flag: '标示',
				contact: '联系人',
				mobile: '联系电话'
			};
			for(var k in names) {
				var m = {
					name: names[k],
					model: ret[k]
				};
				this.info.push(m);
			};
		});

	};

}