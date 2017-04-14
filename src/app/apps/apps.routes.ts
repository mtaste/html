import {
	RouterModule
} from "@angular/router";
import {
	AppsComponent
} from "./apps.component";
import {
	AppsRouterActivate,
	AppsActivate
} from "./apps.routers.service";

const routes = [{
	path: '',
	component: AppsComponent,
	children: [{
		path: "",
		canActivate: [AppsActivate]
	}, {
		path: 'circle',
		loadChildren: 'app/apps/circle/app.module',
		canActivate: [AppsActivate],
		name: 'Circle'
	}, {
		path: 'community',
		loadChildren: 'app/apps/community/app.module',
		canActivate: [AppsActivate],
		name: 'Community'
	}]
}];

function GetRoters() {
	return routes;
}
export default RouterModule.forChild(GetRoters());