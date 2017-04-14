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
	InfoComponent
} from "./info/info.component";
import {
	ChartModule,
	CalendarModule
} from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule,
		ChartModule,
		CalendarModule
	],
	declarations: [
		InfoComponent
	]
})
export default class Module {}