import {
	Component,
	OnInit,
	Inject,
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	UtilService
} from '../../shared/index';
import {
	Md5
} from "ts-md5/dist/md5";
import {
	SelectItem
} from 'primeng/primeng';
import {
	Router
} from '@angular/router';
import {
	UserService
} from "../user.service";
@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css'],
	providers: [FormBuilder]
})
export class UserLoginComponent implements OnInit {
	userform: FormGroup;
	submitted: boolean;
	description: string;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService,
		private utilService: UtilService
	) {
		this.utilService.loadingCompont = false;
	}

	ngOnInit() {
		this.userform = this.fb.group({
			'userName': new FormControl('', Validators.required),
			'passWord': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
		});
	}

	onSubmit(obj) {
		this.submitted = true;
		var pw = obj["passWord"];
		var p = Md5.hashStr(pw).toString();
		var param = {
			userName: obj.userName.toString(),
			passWord: p
		};
		this.userService.LoginUser(param, ret => {
			window.localStorage["token"] = ret.data;
			this.utilService.loadingCompont = true;
			this.router.navigateByUrl('/admin');
		});
	}

	get diagnostic() {
		return JSON.stringify(this.userform.value);
	}

}