import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import AnotherLayout from '../components/Layout/AnotherLayout';

import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Setting from '../pages/Setting';
import Chart from '../pages/Chart';
import Task from '../pages/Task';
import Order from '../pages/Order';
import Chat from '../pages/Chat';
import Email from '../pages/Email';
import Profile from '../pages/Profile';
import Request from '../pages/Request';
import Blog from '../pages/Blog';
import Requirement from '../pages/Requirement';
import Rule from '../pages/Rule';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/task" element={<Task />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/email" element={<Email />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/request" element={<Request />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/rule" element={<Rule />} />
        <Route path="/requirement" element={<Requirement />} />
      </Route>
      <Route
        path="/another"
        element={
          <AnotherLayout>
            <div>Another Page Content</div>
          </AnotherLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
