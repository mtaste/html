import {
	NgModule
} from "@angular/core";
import {
	PNGModule
} from '../index';
import {
	CommonModule
} from "@angular/common";
import {
	AuthOrgComponent
} from "./auth-org.component";
import routes from './auth-org.routes';
import {
	FieldsetModule,
	TreeModule,
	InputTextModule,
	ButtonModule,
	MenubarModule,
	ConfirmDialogModule,
	GrowlModule,
	DataListModule,
	DialogModule
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
		DialogModule
	],
	declarations: [AuthOrgComponent]
})
export default class AuthOrgModule {}