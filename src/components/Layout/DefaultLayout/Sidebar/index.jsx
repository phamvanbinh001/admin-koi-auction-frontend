import { Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartLine,
  faCogs,
  faSignOutAlt,
  faEnvelope,
  faUsers,
  faBlog,
  faListCheck,
  faScaleBalanced,
  faFileContract,
  faHandshakeSimple,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const items = [
    {
      key: '1',
      icon: <FontAwesomeIcon icon={faHome} />,
      label: <Link to="/">Dashboard</Link>, // Sử dụng Link
    },
    {
      key: 'sub1',
      icon: <FontAwesomeIcon icon={faListCheck} />,
      label: 'Management',
      children: [
        {
          key: '2',
          label: <Link to="/request">Request</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faListCheck} />,
        },
        {
          key: '3',
          label: <Link to="/user">User</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faUsers} />,
        },
        {
          key: '4',
          label: <Link to="/chart">Charts</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faChartLine} />,
        },
      ],
    },
    {
      key: 'sub2',
      icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
      label: 'Services',
      children: [
        {
          key: '5',
          label: <Link to="/chat">Chat</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faCommentDots} />,
        },
        {
          key: '6',
          label: <Link to="/email">Email</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faEnvelope} />,
        },
        {
          key: '7',
          label: <Link to="/blog">Blogs</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faBlog} />,
        },
      ],
    },
    {
      key: 'sub3',
      icon: <FontAwesomeIcon icon={faCogs} />,
      label: 'Settings',
      children: [
        {
          key: '8',
          label: <Link to="/rule">Rules</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faScaleBalanced} />,
        },
        {
          key: '9',
          label: <Link to="/requirement">Requirements</Link>, // Sử dụng Link
          icon: <FontAwesomeIcon icon={faFileContract} />,
        },
      ],
    },
    {
      key: '10',
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      label: <Link to="/">Logout</Link>, // Sử dụng Link
    },
  ];

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', width: 200, position: 'fixed', left: 0, top: 64, borderRight: 0 }}
      items={items}
    />
  );
};

export default Sidebar;
