import {
	NgModule
} from './shared/index';
import {
	SharedModule
} from './shared/shared.module';
import {
	OtherModule
} from './shared/other.module';
import {
	AppComponent
} from './app.component';
import appRoutes from './app.routes';
import {
	API_URL,
	STARWARS_BASE_URL
} from "./shared/constance.service";
import {
	UtilService
} from "./shared/util.service";
import {
	RequestService
} from "./shared/request.service";
import {
	AppRouterActivate,
	AppRouterService
} from "./app.routers.service";
import {
	AppOverService
} from "./shared/app.over.service";
import {
	AppsRouterActivate,
	AppsRouterService,
	AppsActivate
} from "./apps/apps.routers.service";
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		appRoutes,
		SharedModule.forRoot(),
		OtherModule.forRoot()
	],
	providers: [{
			provide: API_URL,
			useValue: `https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK`
		}, {
			provide: STARWARS_BASE_URL,
			useValue: `app/json`
		},
		UtilService,
		RequestService,
		AppRouterService,
		AppRouterActivate,
		AppOverService,
		AppsRouterActivate,
		AppsRouterService,
		AppsActivate
	],
	bootstrap: [AppComponent]
})
export class AppModule {}