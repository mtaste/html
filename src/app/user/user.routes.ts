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
	RouterModule
} from "@angular/router";
const routes = [{
	path: '',
	component: UserComponent,
	children: [{
		path: ""
	}, {
		path: "login",
		component: UserLoginComponent
	}, {
		path: "register",
		component: UserRegisterComponent
	}]
}];
export default RouterModule.forChild(routes);