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

@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule
	],
	declarations: []
})
export default class Module {}