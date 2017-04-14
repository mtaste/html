import {
	Injectable,
	Inject
} from '@angular/core';

@Injectable()
export class UtilService {
	public loadingCompont = false;
	public loadingRequest = false;
	constructor() {};
	//获取分布参数
	GetPageInfo() {
		return {
			first: 0,
			rows: 10
		}
	};
	//删除节点
	DeleteTree(data, chindrenStr, name, values) {
		var ret = [];
		var value = {};
		for(var k in values) {
			value[values[k][name]] = "Y";
		}
		this.delTreeList(data, chindrenStr, name, value);
	};
	private delTreeList(data, chindrenStr, name, value) {
		for(var i in data) {
			var children = data[i][chindrenStr];
			if(value[data[i][name]] == "Y") {
				data.splice(i, 1);
			} else {
				this.delTreeList(children, chindrenStr, name, value);
			};
		}
	};
	//获取树节点数组
	GetArray(data, chindrenStr, name, values) {
		var ret = [];
		var value = {};
		for(var k in values) {
			value[values[k][name]] = "Y";
		}
		this.getArrayList(data, chindrenStr, name, value, ret);
		return ret;
	};
	private getArrayList(data, chindrenStr, name, value, ret) {
		for(var i in data) {
			var children = data[i][chindrenStr];
			if(value[data[i][name]] == "Y") {
				data[i].expanded = true;
				ret.push(data[i]);
			} else {
				data[i].expanded = true;
			}
			if(data[i].id == "0") {
				data[i].expanded = true;
			}
			if(children) {
				this.getArrayList(children, chindrenStr, name, value, ret);
			};
		}
	};
	//json格式转树状结构
	TransData(a, idStr, pidStr, chindrenStr) {
		var r = [],
			hash = {},
			id = idStr,
			pid = pidStr,
			children = chindrenStr,
			i = 0,
			j = 0,
			len = 0;
		a && a.length && (len = a.length);
		for(; i < len; i++) {
			if(a[i].id == "0") {
				a[i].expanded = true;
			}
			hash[a[i][id]] = a[i];
		}
		for(; j < len; j++) {
			var aVal = a[j],
				hashVP = hash[aVal[pid]];
			if(hashVP) {
				!hashVP[children] && (hashVP[children] = []);
				hashVP[children].push(aVal);
			} else {
				r.push(aVal);
			}
		}
		return r;
	};
	//获取属性所在Index
	GetArrayIndex(arry, f, v): any {
		for(var i in arry) {
			var t = arry[i];
			if(t[f] == v) {
				return i;
			}
		}
		return -1;
	};
	//复制值
	CopyObj(source, targer) {
		var m = {};
		for(var k in source) {
			m[k] = targer[k] || "";
		}
		return m;
	};
	//请除对像
	ClearObj(source) {
		var m = {};
		for(var k in source) {
			m[k] = "";
		}
		return m;
	};
	//获取IDS 
	GetIds(rows, field) {
		var rets = [];
		for(var k in rows) {
			rets.push(rows[k][field]);
		}
		return rets.join(",");
	};
	//获取状态文字
	private status = {
		'-1': '无效',
		'10': '有效',
		'11': '挂失',
		'0': '新建',
		'1': '已提交',
		'2': '已审核',
		'99': '已否决'
	};
	GetStatus(k) {
		var s = this.status;
		return s[k];
	};
	GetStatusTab(ks, c) {
		var a = this.status;
		var ret = [];
		if(!c) {
			ret.push({
				label: '所有',
				value: ''
			});
		} else {
			ret.push({
				label: '请选择',
				value: ''
			});
		}
		for(var k in ks) {
			var l = ks[k];
			a[l] && (ret.push({
				label: a[l],
				value: l
			}));
		};
		return ret;
	};
	public validStatus = {
		'-1': '无效',
		'10': '有效'
	};
	GetValidSelect() {
		var ret = [];
		var ks = this.validStatus;
		for(var k in ks) {
			ks[k] && (ret.push({
				label: ks[k],
				value: k
			}));
		};
		return ret;
	};
	GetRandomColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	};
	TimeForam(val, fm) {
		return new Date(val)['Format'](fm);
	};
}