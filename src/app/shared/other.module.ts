import {
	NgModule,
	ModuleWithProviders
} from './index';
import {
	I18nPipe
} from "angular2-i18n";
@NgModule({
	imports: [],
	declarations: [I18nPipe],
	exports: [I18nPipe]
})

export class OtherModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: OtherModule
		};
	}
}