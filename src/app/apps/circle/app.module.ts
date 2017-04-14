import {
	NgModule,
	CommonModule
} from '../../shared/index';
import {
	AppComponent
} from "./app.component";
import {
	MenuModule
} from "../../components/menu-component/menu-module";
import appsRoutes from './app.routes';

@NgModule({
	imports: [
		appsRoutes,
		CommonModule,
		MenuModule
	],
	declarations: [
		AppComponent
	]
})
export default class AppModule {}