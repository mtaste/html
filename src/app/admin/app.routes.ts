import {
	RouterModule
} from "@angular/router";
import {
	AppComponent
} from './app.component';
import {
	AppRouterActivate
} from "./app.routers.service";
const routes = [{
	path: '',
	component: AppComponent,
	canActivate: [AppRouterActivate],
	children: [{
		path: ""
	}, {
		path: 'mg/authDefine',
		loadChildren: 'app/admin/mg/auth-define/auth-define.module',
		name: 'AuthDefine'
	}, {
		path: 'mg/authOrg',
		loadChildren: 'app/admin/mg/auth-org/auth-org.module',
		name: 'AuthOrg'
	}, {
		path: 'sys/orgDefine',
		loadChildren: 'app/admin/sys/org-define/org-define.module',
		name: 'OrgDefine'
	}, {
		path: 'personnel',
		loadChildren: 'app/admin/personnel/module',
		name: 'MgUser'
	}, {
		path: 'mg/org',
		loadChildren: 'app/admin/mg/org/org.module',
		name: 'MgOrg'
	}, {
		path: 'crm',
		loadChildren: 'app/admin/crm/crm.module',
		name: 'CRM'
	}, {
		path: 'im',
		loadChildren: 'app/admin/im/im.module',
		name: 'IM'
	}, {
		path: 'mms',
		loadChildren: 'app/admin/mms/mms.module',
		name: 'MMS'
	}, {
		path: 'agent',
		loadChildren: 'app/admin/agent/module',
		name: 'Agent'
	}, {
		path: 'report',
		loadChildren: 'app/admin/report/module',
		name: 'Report'
	}, {
		path: 'oa',
		loadChildren: 'app/admin/oa/module',
		name: 'OA'
	}, {
		path: 'asset',
		loadChildren: 'app/admin/asset/module',
		name: 'Asset'
	}]
}];
export default RouterModule.forChild(routes);