import React from 'react';
import { Breadcrumb, ConfigProvider } from 'antd';
import styles from './index.module.scss';
const BreadcrumbComponent = React.memo(() => {
  console.log('render BreadcrumbComponent');

  const items = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Dashboard',
      link: '/',
    },
  ];
  return (
    <div className={styles.breadcrumbContainer}>
      <Breadcrumb items={items} />
    </div>
  );
});

export default BreadcrumbComponent;
