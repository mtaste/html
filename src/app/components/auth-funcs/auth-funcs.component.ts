import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	ActivatedRoute
} from '@angular/router';
import {
	MenuItem
} from 'primeng/primeng';
import {
	AuthService,
	UtilService
} from '../index';

@Component({
	selector: 'app-auth-funcs',
	templateUrl: './auth-funcs.component.html',
	styleUrls: ['./auth-funcs.component.css']
})
export class AuthFuncsComponent implements OnInit {
	@Input() menus = {};
	@Input() obj = {};
	@Output() initEvent: EventEmitter < any > = new EventEmitter();
	//菜单功能临时变量
	private t_menu = {};
	private t_funcs = {};
	//列表菜单
	private funcs: MenuItem[] = [];
	constructor(
		private router: ActivatedRoute,
		private authService: AuthService) {

	};

	ngOnInit() {
		//菜单数据
		this.router.queryParams.subscribe((params) => {
			var id = params["id"];
			this.authService.GetAuthFunc(id, (ret) => {
				for(var k in ret) {
					if(this.menus[k]) {
						var m = ret[k];
						m.command = (auth) => {
							this.t_menu = auth.item;
							var t = this.menus[this.t_menu["authValue"]];
							t && (t(auth, this.obj));
						}
						this.t_funcs[k] = m;
						this.funcs.push(m);
					}
				}
				this.initEvent.emit(this);
			});
		});
	};
	RestFuncs(keys) {
		this.funcs = [];
		for(var k in keys) {
			var kk = keys[k];
			var m = this.t_funcs[kk];
			m && this.funcs.push(m);
		}
	}

}