import {
	FormsModule,
	HttpModule,
	JsonpModule,
	NgModule,
	ModuleWithProviders,
	ReactiveFormsModule,
	CommonModule
} from './index';

@NgModule({
	imports: [FormsModule, HttpModule, JsonpModule],
	declarations: [],
	exports: [FormsModule, HttpModule, JsonpModule, ReactiveFormsModule, CommonModule]
})

export class PNGModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PNGModule
		};
	}
}