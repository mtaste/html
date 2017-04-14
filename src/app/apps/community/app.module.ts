import {
	NgModule
} from '../../shared/index';
import {
	AppComponent
} from "./app.component";
import appsRoutes from './app.routes';
@NgModule({
	imports: [
		appsRoutes
	],
	declarations: [
		AppComponent
	]
})
export default class AppModule {}