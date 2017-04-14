import {
	NgModule,
	ModuleWithProviders,
	CommonModule
} from '../../shared/index';
import {
	MenuComponentComponent
} from "./menu-component.component";
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		MenuComponentComponent
	],
	exports: [
		MenuComponentComponent
	]
})

export class MenuModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: MenuModule
		};
	}
}