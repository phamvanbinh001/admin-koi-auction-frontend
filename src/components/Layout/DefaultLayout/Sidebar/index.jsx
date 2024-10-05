import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      icon: <FontAwesomeIcon icon={faHome} />,
      label: 'Dashboard',
      onClick: () => navigate('/'),
    },
    {
      key: 'sub1',
      icon: <FontAwesomeIcon icon={faListCheck} />,
      label: 'Management',
      children: [
        {
          key: '2',
          label: 'User',
          icon: <FontAwesomeIcon icon={faUsers} />,
          onClick: () => navigate('/'),
        },
        {
          key: '3',
          label: 'Charts',
          icon: <FontAwesomeIcon icon={faChartLine} />,
          onClick: () => navigate('/chart'),
        },
      ],
    },
    {
      key: 'sub2',
      icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
      label: 'Services',
      children: [
        {
          key: '4',
          label: 'Chat',
          icon: <FontAwesomeIcon icon={faCommentDots} />,
          onClick: () => navigate('/chat'),
        },
        {
          key: '5',
          label: 'Email',
          icon: <FontAwesomeIcon icon={faEnvelope} />,
          onClick: () => navigate('/email'),
        },
        {
          key: '6',
          label: 'Blogs',
          icon: <FontAwesomeIcon icon={faBlog} />,
          onClick: () => navigate('/'),
        },
      ],
    },
    {
      key: 'sub3',
      icon: <FontAwesomeIcon icon={faCogs} />,
      label: 'Settings',
      children: [
        {
          key: '7',
          label: 'Auction Rules',
          icon: <FontAwesomeIcon icon={faScaleBalanced} />,
          onClick: () => navigate('/'),
        },
        {
          key: '8',
          label: 'Auction Requirements',
          icon: <FontAwesomeIcon icon={faFileContract} />,
          onClick: () => navigate('/'),
        },
      ],
    },
    {
      key: '9',
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      label: 'Logout',
      onClick: () => navigate('/'),
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
