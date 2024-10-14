import React from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = ({ children }) => {
  return <Content className={styles.content}>{'Content' || children}</Content>;
};

export default ContentComponent;
