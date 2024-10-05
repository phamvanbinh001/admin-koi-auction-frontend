import Dashboard from '../pages/Dashboard';
import Chart from '../pages/Chart';
import Task from '../pages/Task';
import Order from '../pages/Order';
import Chat from '../pages/Chat';
import Email from '../pages/Email';
import Setting from '../pages/Setting';
import Profile from '../pages/Profile';

//Dự kiến để những routes cho cả admin + staff có thể xem
const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/chart', component: Chart },
    { path: '/task', component: Task },
    { path: '/order', component: Order },
    { path: '/chat', component: Chat },
    { path: '/email', component: Email },
    { path: '/setting', component: Setting },
    { path: '/profile', component: Profile },

]

//Chỉ cho admin xem routes này
const privateRoutes = [

]

export { publicRoutes, privateRoutes }