import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'app-menu-component',
	templateUrl: './menu-component.component.html',
	styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {
	//menus
	@Input() menus = [];
	@Input() menuId = "";
	@Output() onSelected: EventEmitter < any > = new EventEmitter();
	constructor() {}
	ngOnInit() {}

	ToggleMenu(m) {
		m.close = !m.close;
		this.menuId = m.id;
		this.onSelected.emit(m);
	}
}