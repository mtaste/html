import {
	NgModule
} from '../shared/index';
import {
	PNGModule
} from '../shared/png.module';
import {
	OtherModule
} from '../shared/other.module';
import {
	UserService
} from "./user.service";
import {
	UserComponent
} from "./user.component";
import {
	UserLoginComponent
} from "./login/user-login.component";
import {
	UserRegisterComponent
} from "./register/user-register.component";
import {
	PanelModule,
	MessagesModule,
	InputTextModule,
	DropdownModule,
	InputTextareaModule,
	ButtonModule
} from 'primeng/primeng';
import userRoutes from './user.routes';
@NgModule({
	imports: [
		PNGModule.forRoot(),
		OtherModule.forRoot(),
		PanelModule,
		InputTextModule,
		DropdownModule,
		InputTextareaModule,
		ButtonModule,
		MessagesModule,
		userRoutes
	],
	declarations: [
		UserComponent,
		UserLoginComponent,
		UserRegisterComponent
	],
	providers: [UserService]
})
export default class UserModule {}