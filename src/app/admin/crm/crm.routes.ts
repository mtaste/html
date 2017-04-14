import {
	CusComponent
} from "./cus/cus.component";
import {
	SupComponent
} from "./sup/sup.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'cus',
	component: CusComponent
}, {
	path: 'sup',
	component: SupComponent
}];
export default RouterModule.forChild(routes);