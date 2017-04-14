import {
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'mms',
	loadChildren: 'app/admin/report/mms/module',
	name: 'MMSReport'
}, {
	path: 'agent',
	loadChildren: 'app/admin/report/agent/module',
	name: 'MMSReport'
}];
export default RouterModule.forChild(routes);