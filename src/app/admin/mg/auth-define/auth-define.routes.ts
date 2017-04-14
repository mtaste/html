import {
	AuthDefineComponent
} from "./auth-define.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: '',
	component: AuthDefineComponent
}];
export default RouterModule.forChild(routes);