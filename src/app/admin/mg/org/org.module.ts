import {
	NgModule
} from "@angular/core";
import {
	PNGModule,
	ComponentsModule
} from '../index';
import {
	CommonModule
} from "@angular/common";
import {
	OrgRegisterComponent
} from "./register/org-register.component";
import {
	OrgAuthComponent
} from "./auth/org-auth.component";
import {
	OrgListComponent
} from "./list/org-list.component";
import routes from './org.routes';
import {
	FieldsetModule,
	TreeModule,
	InputTextModule,
	ButtonModule,
	MenubarModule,
	ConfirmDialogModule,
	GrowlModule,
	DataListModule,
	DialogModule,
	DataTableModule,
	SharedModule,
	DropdownModule
} from 'primeng/primeng';
@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		FieldsetModule,
		TreeModule,
		InputTextModule,
		ButtonModule,
		MenubarModule,
		ConfirmDialogModule,
		GrowlModule,
		DataListModule,
		DialogModule,
		DataTableModule,
		DropdownModule,
		SharedModule,
		ComponentsModule
	],
	declarations: [
		OrgRegisterComponent,
		OrgAuthComponent,
		OrgListComponent
	]
})
export default class OrgRegisterModule {
	constructor() {};
}