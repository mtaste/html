import {
	NgModule
} from "@angular/core";
import {
	PNGModule,
	ComponentsModule
} from './index';
import routes from './routes';
import {
	CommonModule
} from "@angular/common";
import {
	TaskComponent
} from "./task/task.component";
import {
	NoticeComponent
} from "./notice/notice.component";
import {
	AttendanceComponent
} from "./attendance/attendance.component";
import {
	ButtonModule
} from 'primeng/primeng';
@NgModule({
	imports: [
		CommonModule,
		routes,
		PNGModule.forRoot(),
		ComponentsModule,
		ButtonModule
	],
	declarations: [
		TaskComponent,
		NoticeComponent,
		AttendanceComponent
	]
})
export default class Module {}