import {
	AuthOrgComponent
} from "./auth-org.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: '',
	component: AuthOrgComponent
}];
export default RouterModule.forChild(routes);