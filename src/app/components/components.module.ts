import {
	NgModule,
	ModuleWithProviders,
	CommonModule
} from '../shared/index';
import {
	PNGModule
} from '../shared/png.module';
import {
	MenuModule
} from "./menu-component/menu-module";
import {
	FormComponentComponent
} from "./form-component/form-component.component";
import {
	ListComponentComponent
} from "./list-component/list-component.component";
import {
	ListFormComponentComponent
} from "./list-form-component/list-form-component.component";
import {
	EasyFormComponentComponent
} from "./easy-form-component/easy-form-component.component";
import {
	SelectListComponent
} from "./select-list/select-list.component";
import {
	SelectChangeComponent
} from "./select-change/select-change.component";
import {
	SelectDialogComponent
} from "./select-dialog/select-dialog.component";
import {
	AuthFuncsComponent
} from "./auth-funcs/auth-funcs.component";
import {
	MenubarModule,
	GrowlModule,
	ConfirmDialogModule,
	FieldsetModule,
	InputTextModule,
	ButtonModule,
	DataTableModule,
	InputTextareaModule,
	DialogModule,
	SelectButtonModule,
	DropdownModule
} from 'primeng/primeng';
@NgModule({
	imports: [
		CommonModule,
		PNGModule.forRoot(),
		MenubarModule,
		GrowlModule,
		FieldsetModule,
		InputTextModule,
		ButtonModule,
		DataTableModule,
		InputTextareaModule,
		DialogModule,
		ConfirmDialogModule,
		SelectButtonModule,
		DropdownModule,
		MenuModule
	],
	declarations: [
		FormComponentComponent,
		ListComponentComponent,
		ListFormComponentComponent,
		EasyFormComponentComponent,
		AuthFuncsComponent,
		SelectListComponent,
		SelectChangeComponent,
		SelectDialogComponent
	],
	exports: [
		FormComponentComponent,
		ListComponentComponent,
		ListFormComponentComponent,
		EasyFormComponentComponent,
		AuthFuncsComponent,
		SelectListComponent,
		SelectChangeComponent,
		SelectDialogComponent
	]
})

export class ComponentsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ComponentsModule
		};
	}
}