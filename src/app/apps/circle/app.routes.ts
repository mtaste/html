import {
	RouterModule
} from "@angular/router";
import {
	AppComponent
} from './app.component';
import {
	HallComponent
} from './hall/hall.component';
import {
	InfoComponent
} from "./info/info.component";
import {
	FriendsComponent
} from "./friends/friends.component";
import {
	PersonalComponent
} from "./personal/personal.component";
const routes = [{
	path: '',
	component: AppComponent,
	children: [{
		path: ""
	}, {
		path: 'hall',
		component: HallComponent
	}, {
		path: 'info',
		component: InfoComponent
	}, {
		path: 'friends',
		component: FriendsComponent
	}, {
		path: 'personal',
		component: PersonalComponent
	}]
}];
export default RouterModule.forChild(routes);