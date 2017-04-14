import {
	MgUserComponent
} from "./mg-user/mg-user.component";
import {
	InfoComponent
} from "./info/info.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'mgUser',
	component: MgUserComponent
}, {
	path: 'info',
	component: InfoComponent
}];
export default RouterModule.forChild(routes);