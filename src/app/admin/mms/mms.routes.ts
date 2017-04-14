import {
	PointsChangeComponent
} from "./points-change/points-change.component";
import {
	InfoComponent
} from "./info/info.component";
import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'info',
	component: InfoComponent
}, {
	path: 'points-change',
	component: PointsChangeComponent
}];
export default RouterModule.forChild(routes);