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
@Component({
	selector: 'report-agent-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
	@ViewChild('child') chart;
	private model = {
		beginTime: "",
		endTime: "",
		userName: ""
	};
	data: any;
	constructor(
		private utilService: UtilService,
		private crudService: CrudService) {
		this.utilService.loadingCompont = false;
	};
	TransData(ret) {
		var labels = [];
		var user = {};
		var moths = {};
		//获取用户
		for(var k in ret) {
			var t = ret[k];
			user[t['userName']] = [];
		}
		//获取月份
		for(var k in ret) {
			var t = ret[k];
			var key = t['mothDay'];
			if(!moths[key]) moths[key] = {};
			moths[key][t['userName']] = t['points'];
		};
		for(var k in moths) {
			labels.push(k);
			var t = moths[k];
			for(var j in user) {
				if(t[j]) {
					user[j].push(t[j]);
				} else {
					user[j].push("0");
				}
			};
		}
		var datasets = [];
		for(var k in user) {
			datasets.push({
				label: k,
				data: user[k],
				fill: false,
				borderColor: this.utilService.GetRandomColor()
			});
		};
		return {
			labels: labels,
			datasets: datasets
		};
	}

	ngAfterViewInit() {

	}
	ngOnInit() {

	};

	Search() {
		var param = this.utilService.CopyObj(this.model, this.model);
		param['beginTime'] = this.utilService.TimeForam(param['beginTime'], 'yyyy-MM-dd');
		param['endTime'] = this.utilService.TimeForam(param['endTime'], 'yyyy-MM-dd');
		this.crudService.GetData('report/agent/info', param, (ret) => {
			ret = ret.data;
			this.chart.data = this.TransData(ret);
			this.chart.refresh();
		});
	};
}