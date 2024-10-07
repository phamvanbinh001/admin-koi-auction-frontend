import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { text } from "@fortawesome/fontawesome-svg-core";


const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Gọi API
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }, [])

  const handleRemove = (id) => {
    console.log(`Remove: ${id}`)
    
  }
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (record) => (
        <div>
          <div className="user-name">{record.name}</div>
          <div style={{color: '#888'}} className="user-email">{record.email}</div>
        </div>
      )
    }, 
    {
      title: 'Phone',
      dataIndex: 'phone',
      key:'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: address => `${address.street}, ${address.city}`,
    }, 
    {
      title: 'Status',
      dataIndex: "active",
      key: 'status',
    }, 
    {
      title: 'Role',
      dataIndex: 'user',
      key: 'role',
    }, 
    {
      title: 'Create at',
      dataIndex: "16:16:16-01-01-2024",
      key: 'createAt',
    }, 
    {
      title: 'Action', 
      key: 'action', 
      render: (record) => {
        <Button onClick={handleRemove((record.id))} type="primary" danger>
          Update
        </Button>
      }
    }
  ]
  
  return (
    <div>
      <h2>User manager</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  )
}

export default User;
