import {
	RouterModule
} from "@angular/router";
import {
	AppComponent
} from './app.component';
const routes = [{
	path: '',
	component: AppComponent,
}, {
	path: 'contact',
	loadChildren: 'app/apps/community/contact/contact.module',
	name: 'Contact'
}];
export default RouterModule.forChild(routes);