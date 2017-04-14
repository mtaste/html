import {
	NgModule
} from "@angular/core";
import {
	PNGModule,
	ComponentsModule
} from './index';
import routes from './routes';
import {
	CommonModule
} from "@angular/common";
import {
	CheckInComponent
} from "./check-in/check-in.component";
import {
	ManageComponent
} from "./manage/manage.component";

import {
	ButtonModule,
	MenubarModule,
	FieldsetModule,
	DataTableModule,
	InputTextModule,
	GrowlModule
} from 'primeng/primeng';
@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule,
		ButtonModule,
		MenubarModule,
		FieldsetModule,
		DataTableModule,
		InputTextModule,
		GrowlModule
	],
	declarations: [
		CheckInComponent,
		ManageComponent
	]
})
export default class Module {}