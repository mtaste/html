import {
	BookInComponent
} from "./book-in/book-in.component";
import {
	StockChangeComponent
} from "./stock-change/stock-change.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'book-in',
	component: BookInComponent
}, {
	path: 'stock-change',
	component: StockChangeComponent
}];
export default RouterModule.forChild(routes);