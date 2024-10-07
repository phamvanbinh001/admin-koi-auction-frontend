import React from 'react';
import HeaderComponent from './Header';
import Sidebar from './Sidebar';
import ContentComponent from './Content';

const DefaultLayout = () => {
  return (
    <div>
      <HeaderComponent />
      <Sidebar />
      <div className="content">
        <ContentComponent />
      </div>
    </div>
  );
};

export default DefaultLayout;
