import {
	NgModule,
	CommonModule
} from '../../shared/index';
import {
	AppComponent
} from "./app.component";
import {
	HallComponent
} from "./hall/hall.component";
import {
	InfoComponent
} from "./info/info.component";
import {
	FriendsComponent
} from "./friends/friends.component";
import {
	PersonalComponent
} from "./personal/personal.component";
import {
	MenuModule
} from "../../components/menu-component/menu-module";

import {
	PixiService,
	HallService
} from "./services/index";

import appsRoutes from './app.routes';

@NgModule({
	imports: [
		appsRoutes,
		CommonModule,
		MenuModule
	],
	declarations: [
		AppComponent,
		HallComponent,
		InfoComponent,
		FriendsComponent,
		PersonalComponent
	],
	providers: [
		PixiService,
		HallService
	]
})
export default class AppModule {}