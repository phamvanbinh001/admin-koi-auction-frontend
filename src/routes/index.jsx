import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Setting from '../pages/Setting';
import Auction from '../pages/Auction';
import Chat from '../pages/Chat';
import Email from '../pages/Email';
import Profile from '../pages/Profile';
import RequestPage from '../pages/Request';
import Blog from '../pages/Blog';
import Transaction from '../pages/Transaction';
import Page401 from '../pages/401';
import Page404 from '../pages/404';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword.jsx';

const publicRoutes = [
  { path: '/401', component: Page401 },
  { path: '*', component: Page404 },
  { path: '/login', component: Login },
  { path: '/forgotPassword', component: ForgotPassword },
];

const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/management/user', component: User },
  { path: '/setting', component: Setting },
  { path: '/management/auction', component: Auction },
  { path: '/services/chat', component: Chat },
  { path: '/services/email', component: Email },
  { path: '/profile', component: Profile },
  { path: '/management/request', component: RequestPage },
  { path: '/services/blog', component: Blog },
  { path: '/management/transaction', component: Transaction },
];

export { publicRoutes, privateRoutes };
