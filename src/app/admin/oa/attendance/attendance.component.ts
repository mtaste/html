import {
	Component,
	OnInit
} from '@angular/core';
import {
	Validators,
	UtilService,
	CrudService
} from '../index';
@Component({
	selector: 'oa-app-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
	private model = {
		nowTime: null,
		oldDate: null,
		beginTime: null,
		endTime: null
	};
	//列表
	private listModel = {};
	constructor(
		private utilService: UtilService,
		private crudService: CrudService) {
		this.utilService.loadingCompont = false;
		//list model
		this.listModel = this.getListModel();

	}

	ngOnInit() {
		this.crudService.GetData('oa/attendance/today.do', {}, ret => {
			ret = ret.data;
			for(var k in ret) {
				ret[k] && (this.model[k] = new Date(parseInt(ret[k])));
			}
			this.model.oldDate = ret.oldTime;
			this.BeginTime();

		});
	};

	SignIn() {
		this.crudService.SaveData('oa/attendance/signIn.do', {}, ret => {
			ret = ret.data;
			ret && (this.model.beginTime = new Date(parseInt(ret)));
		});
	};
	SignOut() {
		var msg = "确定在此时间签出:" + new Date()['Format']("yyyy-MM-dd hh:mm:ss");
		if(confirm(msg)) {
			this.crudService.SaveData('oa/attendance/signOut.do', {}, ret => {
				ret = ret.data;
				ret && (this.model.endTime = new Date(parseInt(ret)));
			});
		}
	};

	getListModel() {
		return {
			url: 'oa/attendance/list.json',
			model: [{
				field: 'dayDate',
				header: '签到日'
			}, {
				field: 'beginTime',
				header: '签到时间'
			}, {
				field: 'endTime',
				header: '签出时间'
			}]
		};
	};
	// 定时器
	private timer;
	// 每一秒更新时间差
	BeginTime() {
		this.timer = setInterval(() => {
			var t = this.model.nowTime['getTime']();
			t += 1000;
			this.model.nowTime = new Date(t);
		}, 1000);
	};

	// 销毁组件时清除定时器
	ngOnDestroy() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	};
}