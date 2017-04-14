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
	AuthDefineComponent
} from "./auth-define.component";
import routes from './auth-define.routes';
import {
	FieldsetModule,
	TreeModule,
	InputTextModule,
	ButtonModule,
	MenubarModule,
	ConfirmDialogModule,
	GrowlModule,
	DropdownModule
} from 'primeng/primeng';
@NgModule({
	imports: [
		PNGModule.forRoot(),
		CommonModule,
		routes,
		FieldsetModule,
		TreeModule,
		InputTextModule,
		ButtonModule,
		MenubarModule,
		ConfirmDialogModule,
		GrowlModule,
		DropdownModule
	],
	declarations: [AuthDefineComponent]
})
export default class AuthDefineModule {}