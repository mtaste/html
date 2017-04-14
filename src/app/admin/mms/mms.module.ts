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
	InfoComponent
} from "./info/info.component";
import {
	PointsChangeComponent
} from "./points-change/points-change.component";
import routes from './mms.routes';

@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule
	],
	declarations: [
		InfoComponent,
		PointsChangeComponent
	]
})
export default class MMSModule {}