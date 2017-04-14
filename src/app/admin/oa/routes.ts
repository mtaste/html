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
	RouterModule
} from "@angular/router";
const routes = [{
	path: 'task',
	component: TaskComponent
}, {
	path: 'notice',
	component: NoticeComponent
}, {
	path: 'attendance',
	component: AttendanceComponent
}];
export default RouterModule.forChild(routes);