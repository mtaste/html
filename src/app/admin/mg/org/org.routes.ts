import {
	OrgRegisterComponent
} from "./register/org-register.component";
import {
	OrgAuthComponent
} from "./auth/org-auth.component";
import {
	OrgListComponent
} from "./list/org-list.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'register',
	component: OrgRegisterComponent
}, {
	path: 'auth',
	component: OrgAuthComponent
}, {
	path: 'list',
	component: OrgListComponent
}];
export default RouterModule.forChild(routes);