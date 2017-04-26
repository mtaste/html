import {
	Router,
	Inject,
	NgModule,
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	HttpModule
} from './index';
import {
	AppsComponent
} from "./apps.component";


import appRoutes from './apps.routes';

@NgModule({
	imports: [
		appRoutes,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations: [
		AppsComponent
	]
})
export default class AppsModule {
	constructor(
		private router: Router
	) {}
}