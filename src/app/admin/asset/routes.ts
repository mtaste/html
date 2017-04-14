import {
	CheckInComponent
} from "./check-in/check-in.component";
import {
	ManageComponent
} from "./manage/manage.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'check-in',
	component: CheckInComponent
}, {
	path: 'manage',
	component: ManageComponent
}];
export default RouterModule.forChild(routes);