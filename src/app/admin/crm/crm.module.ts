import {
	NgModule
} from "@angular/core";
import {
	PNGModule,
	ComponentsModule
} from './index';
import {
	CommonModule
} from "@angular/common";
import {
	CusComponent
} from "./cus/cus.component";
import {
	SupComponent
} from "./sup/sup.component";
import routes from './crm.routes';

@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule
	],
	declarations: [
		CusComponent,
		SupComponent
	]
})
export default class CRMModule {}