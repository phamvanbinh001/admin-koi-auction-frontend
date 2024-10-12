import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Table, Button, notification } from 'antd';
import api from '../../configs';
import userStore from '../../zustand';
import ConfirmPopup from '../../components/Popup/ConfirmPopup';
import RoleUpdate from '../../components/Modal/RoleUpdate';
=======
import { Table, Button, notification, Select } from 'antd';
import axios from 'axios';
import ConfirmPopup from '../../components/Popup/ConfirmPopup';
import RoleUpdateModal from '../../components/Modal/RoleUpdateModal';
import { format } from 'date-fns';

const { Option } = Select;
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)

const User = () => {
  const [users, setUsers] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentName, setCurrentName] = useState('');
<<<<<<< HEAD
  const [currStatus, setCurrStatus] = useState('');
  const [currentRole, setCurrentRole] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const { user } = userStore();
  const token = user.token;

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin-manager/users/getAll', {
        requireAuth: true,
      });

      const formattedUsers = response.data.map((user) => {
        let formattedAddress = user.address;

        if (formattedAddress) {
          try {
            const parsedAddress = JSON.parse(formattedAddress);
            formattedAddress = `${parsedAddress.province || ''}, ${parsedAddress.district || ''}, ${
              parsedAddress.ward || ''
            }, ${parsedAddress.address || ''}`;
          } catch (error) {
            console.error('Error parsing address:', error);
          }
        }

        return {
          ...user,
          address: formattedAddress,
        };
      });

      setUsers(formattedUsers);
=======
  const [currentRole, setCurrentRole] = useState(null);
  const [newRole, setNewRole] = useState(null);

  // Lấy token từ local storage
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/admin-manager/users/getAll',
      );
      setUsers(response.data);
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

<<<<<<< HEAD
  // Gọi fetchUsers khi token thay đổi
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
=======
  useEffect(() => {
    fetchUsers();
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
  }, [token]);

  const handleUpdate = (record) => {
    setCurrentUserId(record.id);
    setCurrentRole(record.role);
    setNewRole(null);
    setIsModalVisible(true);
  };

  const handleCancelUpdate = () => {
    notification.error({
      message: 'Cancelled',
<<<<<<< HEAD
=======
      placement: 'topRight',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    });
    setIsModalVisible(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      if (newRole) {
<<<<<<< HEAD
        await api.post(`/admin-manager/users/update-role/${currentUserId}?role=${newRole}`);
        notification.success({
          message: 'Success',
          description: `User role updated to ${newRole}`,
        });
        setIsModalVisible(false);
        fetchUsers(); // Fetch lại danh sách users sau khi cập nhật
=======
        console.log('newRole', newRole);
        console.log('before put');
        console.log('currentUserId: ', currentUserId);

        await axios.put(
          `https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/admin-manager/users/update-role/${currentUserId}`,
          { role: newRole },
        );

        notification.success({
          message: 'Success',
          // description: `${record.fullName} role updated to ${newRole}`,
        });
        setIsModalVisible(false);
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      } else {
        notification.error({
          message: 'Error',
          description: 'Please select a role to update.',
        });
      }
    } catch (error) {
<<<<<<< HEAD
=======
      console.error('Error response:', error.response);
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      notification.error({
        message: 'Error',
        description: 'Failed to update user role.',
      });
    }
  };

<<<<<<< HEAD
  const handleBan = (user) => {
    setCurrentUserId(user.id);
    setCurrStatus(user.status);
=======
  const handleRemove = (user) => {
    setCurrentUserId(user.id);
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    setCurrentName(user.fullName);
    setIsPopupVisible(true);
  };

<<<<<<< HEAD
  const handleConfirmBan = async () => {
    try {
      if (currStatus === 'Active') {
        await api.post(`/admin-manager/users/ban-user/${currentUserId}`, {
          status: 'Unactive',
        });
        notification.success({
          message: 'Success',
          description: `Banned: ${currentName} (ID: ${currentUserId})`,
        });
      } else {
        await api.post(`/admin-manager/users/active-user/${currentUserId}`, {
          status: 'Active',
        });
        notification.success({
          message: 'Success',
          description: `Actived: ${currentName} (ID: ${currentUserId})`,
        });
      }
      fetchUsers();
    } finally {
      setIsPopupVisible(false);
    }
  };

  const handleCancelBan = () => {
    notification.error({
      message: 'Cancelled',
    });
=======
  const handleConfirmRemove = async () => {
    try {
      await axios.post(
        `https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/admin-manager/users/ban-user/${currentUserId}`,
        {
          status: 'Unactive',
        },
      );
      notification.success({
        message: 'Success',
        description: `Removed user: ${currentName} (Id: ${currentUserId})`,
        placement: 'topRight',
      });
    } finally {
      setIsPopupVisible(false);
      fetchUsers();
    }
  };

  const handleCancelRemove = () => {
    notification.error({
      message: 'Cancelled',
      description: `Cancelled the removal of: ${currentName} (Id: ${currentUserId})`,
      placement: 'topRight',
    });

>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    setIsPopupVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
<<<<<<< HEAD
=======
      align: 'center',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Full Name',
      key: 'fullName',
<<<<<<< HEAD
      render: (text) => (
        <div>
          <b>{text.fullName}</b>
          <div>{text.email}</div>
=======
      render: (text, record) => (
        <div>
          <div className="user-name">
            <b>{record.fullName}</b>
          </div>
          <div className="user-email">{record.email}</div>
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
<<<<<<< HEAD
    },
    {
      title: 'Address',
      key: 'address',
      render: (text) => (
        <div
          style={{
            whiteSpace: 'nowrap', // Giữ text trên cùng 1 dòng
            overflow: 'hidden', // Ẩn phần text dư thừa
            textOverflow: 'ellipsis', // Hiển thị dấu chấm 3 chấm khi text bị ẩn
            maxWidth: '450px',
          }}
        >
          {text.address}
        </div>
      ),
=======
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
<<<<<<< HEAD
      render: (text) => new Date(text).toLocaleString(),
=======
      align: 'center',
      render: (text, record) => format(new Date(record.createAt), 'dd/MM/yyyy HH:mm:ss'),
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Update At',
      dataIndex: 'updateAt',
      key: 'updateAt',
<<<<<<< HEAD
      render: (text) => new Date(text).toLocaleString(),
=======
      align: 'center',
      render: (text, record) => format(new Date(record.updateAt), 'dd/MM/yyyy HH:mm:ss'),
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
<<<<<<< HEAD
      render: (role) => (
        <div
          style={{ fontWeight: role === 'Admin' ? 'bold' : 'normal', color: role === 'Admin' ? '#001529' : 'inherit' }}
=======
      align: 'center',
      render: (role) => (
        <div
          style={{
            fontWeight: role === 'Admin' ? 'bold' : 'normal',
            color: role === 'Admin' ? '#001529' : 'inherit',
          }}
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
        >
          {role}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
<<<<<<< HEAD
=======
      align: 'center',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      render: (status) => <div style={{ color: status === 'Active' ? 'green' : 'red' }}>{status}</div>,
    },
    {
      title: 'Action',
      key: 'action',
<<<<<<< HEAD
      render: (text) => (
        <div>
          <Button onClick={() => handleUpdate(text)} type="primary">
            Update
          </Button>
          <Button onClick={() => handleBan(text)} danger>
            Ban / Active
=======
      align: 'center',
      render: (text, record) => (
        <div>
          <Button onClick={() => handleUpdate(record)} type="primary" size="small">
            Update
          </Button>
          <Button onClick={() => handleRemove(record)} type="primary" size="small" danger>
            Delete
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
<<<<<<< HEAD
      <Table dataSource={users} columns={columns} rowKey="id" />
      <RoleUpdate
=======
      <h2>User Manager</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <RoleUpdateModal
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
        visible={isModalVisible}
        currentRole={currentRole}
        newRole={newRole}
        setNewRole={setNewRole}
        onSubmit={handleSubmitUpdate}
        onCancel={handleCancelUpdate}
      />
      <ConfirmPopup
<<<<<<< HEAD
        open={isPopupVisible}
        onConfirm={handleConfirmBan}
        onCancel={handleCancelBan}
        content={currStatus === 'Active' ? `Ban ${currentName}?` : `Active ${currentName}?`}
=======
        x
        open={isPopupVisible}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        title="Please confirm"
        content={`Are you sure you want to remove user ${currentName}?`}
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      />
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
export default User;
