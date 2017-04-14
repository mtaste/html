import {
	NgModule
} from "@angular/core";
import routes from './routes';
import {
	PNGModule,
	ComponentsModule
} from './index';

import {
	CommonModule
} from "@angular/common";
import {
	MgUserComponent
} from "./mg-user/mg-user.component";
import {
	InfoComponent
} from "./info/info.component";
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
	DropdownModule,
	SelectButtonModule
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
		SharedModule,
		DropdownModule,
		SelectButtonModule,
		ComponentsModule
	],
	declarations: [
		MgUserComponent,
		InfoComponent
	]
})
export default class MgUserModule {}