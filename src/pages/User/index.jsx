import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import api from '../../configs/api';
import useUserStore from '../../configs/useUserStore';
import ConfirmPopup from '../../components/Popup/ConfirmPopup';
import RoleUpdate from '../../components/Modal/RoleUpdate';

const User = () => {
  const [users, setUsers] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [currentRole, setCurrentRole] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const { user } = useUserStore();
  const token = user.token;

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin-manager/users/getAll', {
        requireAuth: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Gọi fetchUsers khi token thay đổi
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
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
      placement: 'topRight',
    });
    setIsModalVisible(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      if (newRole) {
        await api.put(`/admin-manager/users/update-role/${currentUserId}`, { role: newRole });
        notification.success({
          message: 'Success',
          description: `User role updated to ${newRole}`,
        });
        setIsModalVisible(false);
        fetchUsers(); // Fetch lại danh sách users sau khi cập nhật
      } else {
        notification.error({
          message: 'Error',
          description: 'Please select a role to update.',
        });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update user role.',
      });
    }
  };

  const handleRemove = (user) => {
    setCurrentUserId(user.id);
    setCurrentName(user.fullName);
    setIsPopupVisible(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await api.post(`/admin-manager/users/ban-user/${currentUserId}`, {
        status: 'Unactive',
      });
      notification.success({
        message: 'Success',
        description: `Removed user: ${currentName} (Id: ${currentUserId})`,
        placement: 'topRight',
      });
      fetchUsers(); // Fetch lại danh sách users sau khi xóa
    } finally {
      setIsPopupVisible(false);
    }
  };

  const handleCancelRemove = () => {
    notification.error({
      message: 'Cancelled',
      description: `Cancelled the removal of: ${currentName} (Id: ${currentUserId})`,
      placement: 'topRight',
    });
    setIsPopupVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Full Name',
      key: 'fullName',
      render: (text, record) => (
        <div>
          <b>{record.fullName}</b>
          <div className="user-email">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Update At',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align: 'center',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (role) => (
        <div
          style={{ fontWeight: role === 'Admin' ? 'bold' : 'normal', color: role === 'Admin' ? '#001529' : 'inherit' }}
        >
          {role}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <div style={{ color: status === 'Active' ? 'green' : 'red' }}>{status}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button onClick={() => handleUpdate(record)} type="primary" size="small">
            Update
          </Button>
          <Button onClick={() => handleRemove(record)} type="primary" size="small" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>User Manager</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <RoleUpdate
        visible={isModalVisible}
        currentRole={currentRole}
        newRole={newRole}
        setNewRole={setNewRole}
        onSubmit={handleSubmitUpdate}
        onCancel={handleCancelUpdate}
      />
      <ConfirmPopup
        open={isPopupVisible}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        title="Please confirm"
        content={`Are you sure you want to remove user ${currentName}?`}
      />
    </div>
  );
};

export default User;
