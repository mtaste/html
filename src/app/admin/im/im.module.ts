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
	BookInComponent
} from "./book-in/book-in.component";
import {
	StockChangeComponent
} from "./stock-change/stock-change.component";
import routes from './im.routes';
@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule
	],
	declarations: [
		BookInComponent,
		StockChangeComponent
	]
})
export default class OrgRegisterModule {}