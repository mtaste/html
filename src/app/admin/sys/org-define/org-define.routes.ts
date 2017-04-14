import {
	OrgDefineComponent
} from "./org-define.component";
import {
	OrgInfoComponent
} from "./org-info/org-info.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: '',
	component: OrgDefineComponent,
}, {
	path: 'info',
	component: OrgInfoComponent
}];
export default RouterModule.forChild(routes);