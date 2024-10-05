// components/Sidebar/index.jsx
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartLine,
  faCogs,
  faSignOutAlt,
  faEnvelope,
  faUser,
  faComment,
  faBlogger,
} from '@fortawesome/free-solid-svg-icons'; // Import các icon từ FontAwesome

const items = [
  {
    key: '1',
    icon: <FontAwesomeIcon icon={faHome} />, // Sử dụng FontAwesome icon cho Dashboard
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: 'sub1',
    icon: <FontAwesomeIcon icon={faChartLine} />, // Sử dụng FontAwesome icon cho User Management
    label: 'Management',
    children: [
      {
        key: '2',
        label: <Link to="/manage-user">User</Link>,
        icon: <FontAwesomeIcon icon={faUser} />, // Icon người dùng
      },
      {
        key: '3',
        label: <Link to="/chart">Charts</Link>,
        icon: <FontAwesomeIcon icon={faChartLine} />,
      },
    ],
  },
  {
    key: 'sub2',
    icon: <FontAwesomeIcon icon={faChartLine} />, // Icon cho Services
    label: 'Services',
    children: [
      {
        key: '4',
        label: <Link to="/chat">Chat</Link>,
        icon: <FontAwesomeIcon icon={faComment} />,
      },
      {
        key: '5',
        label: <Link to="/email">Email</Link>,
        icon: <FontAwesomeIcon icon={faEnvelope} />, // Icon email
      },
      {
        key: '6',
        label: <Link to="/blogs">Blogs</Link>,
        icon: <FontAwesomeIcon icon={faBlogger} />,
      },
    ],
  },
  {
    key: 'sub3',
    icon: <FontAwesomeIcon icon={faCogs} />, // Icon cho Setting
    label: 'Setting',
    children: [
      {
        key: '7',
        label: <Link to="/setting-rule">Auction Rules</Link>,
      },
      {
        key: '8',
        label: <Link to="/auction-requirement">Auction requirements</Link>,
      },
    ],
  },
  {
    key: '9',
    icon: <FontAwesomeIcon icon={faSignOutAlt} />, // Icon logout
    label: 'Logout',
  },
];

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', width: 200, position: 'fixed', left: 0, top: 64, borderRight: 0 }}
      items={items} // Sử dụng items thay vì children
    />
  );
};

export default Sidebar;
