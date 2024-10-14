import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Setting from '../pages/Setting';
import Chart from '../pages/Chart';
import Auction from '../pages/Auction';
import Order from '../pages/Order';
import Chat from '../pages/Chat';
import Email from '../pages/Email';
import Profile from '../pages/Profile';
import RequestPage from '../pages/Request';
import Blog from '../pages/Blog';
import Requirement from '../pages/Auction';
import Transaction from '../pages/Transaction';
import Page401 from '../pages/401';

const publicRoutes = [
  { path: '/401', component: Page401 },
  { path: '/login', component: Login },
];

const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/user', component: User },
  { path: '/setting', component: Setting },
  { path: '/chart', component: Chart },
  { path: '/auction', component: Auction },
  { path: '/order', component: Order },
  { path: '/chat', component: Chat },
  { path: '/email', component: Email },
  { path: '/profile', component: Profile },
  { path: '/request', component: RequestPage },
  { path: '/blog', component: Blog },
  { path: '/requirement', component: Requirement },
  { path: '/transaction', component: Transaction },
];

export { publicRoutes, privateRoutes };
