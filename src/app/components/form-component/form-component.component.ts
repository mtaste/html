import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	UtilService
} from '../index';
@Component({
	selector: 'app-form-component',
	templateUrl: './form-component.component.html',
	styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
	//详情
	private formModel: FormGroup;
	private canSave = true;
	@Input() form = [];
	@Output() save: EventEmitter < any > = new EventEmitter();
	@Output() initEvent: EventEmitter < any > = new EventEmitter();
	constructor(
		private fb: FormBuilder,
		private utilService: UtilService
	) {

	};

	ngOnInit() {
		//初始化Form
		var f = {};
		for(var k in this.form) {
			var obj = this.form[k];
			var mk = obj['model'];
			if(!obj['vali']) {
				f[mk] = new FormControl();
			} else {
				f[mk] = new FormControl(mk, obj['vali']);
			}
		};
		this.formModel = this.fb.group(f);
		this.initEvent.emit(this);
	};

	onSubmitEvent(value) {
		var param = this.utilService.CopyObj(value, value);
		this.save.emit(param);
	};

}