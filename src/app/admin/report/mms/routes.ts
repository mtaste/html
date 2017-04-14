import {
	InfoComponent
} from "./info/info.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'info',
	component: InfoComponent
}];
export default RouterModule.forChild(routes);