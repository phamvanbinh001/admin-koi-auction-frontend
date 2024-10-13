import React, { useState } from 'react';
import { Layout, Menu, List, Avatar, Button, Pagination, Input } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './blog.css';

const { Header, Sider, Content } = Layout;

const initialPosts = [
  {
    id: 1,
    author: 'John Doe',
    title: 'Understanding React Hooks',
    content:
      'React Hooks are a new addition in React 16.8 that let you use state and other React features without writing a class.',
    time: '2024-10-01',
  },
  {
    id: 2,
    author: 'Jane Smith',
    title: 'A Guide to CSS Grid',
    content:
      'CSS Grid is a two-dimensional layout system for the web, allowing you to design web pages using rows and columns.',
    time: '2024-10-02',
  },
  {
    id: 3,
    author: 'Alice Johnson',
    title: 'JavaScript ES6 Features',
    content:
      'ES6 introduced several new features, including let and const, arrow functions, and classes, that improve the way we write JavaScript.',
    time: '2024-10-03',
  },
  {
    id: 4,
    author: 'Bob Brown',
    title: 'Building a RESTful API with Node.js',
    content:
      'Learn how to build a RESTful API using Node.js and Express, enabling seamless communication between client and server.',
    time: '2024-10-04',
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const pageSize = 5;

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedPost(null);
  };

  const currentPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const renderPostList = () => (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={currentPosts}
        renderItem={(item) => (
          <List.Item onClick={() => handlePostClick(item)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<span className="post-title">{item.title}</span>}
              description={<span className="post-author">{item.author}</span>}
            />
            <div className="post-time">{item.time}</div>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={posts.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );

  const renderPostDetails = () => (
    <div className="post-details">
      <h3 className="post-title">{selectedPost.title}</h3>
      <p>
        <strong>Author:</strong> {selectedPost.author}
      </p>
      <p>
        <strong>Time:</strong> {selectedPost.time}
      </p>
      <p>{selectedPost.content}</p>
      <Button type="primary" onClick={() => setSelectedPost(null)}>
        Back to Blog
      </Button>
    </div>
  );

  const handleAddPost = () => {
    const newPostData = { ...newPost, id: posts.length + 1, time: new Date().toISOString().split('T')[0] };
    setPosts([...posts, newPostData]);
    setNewPost({ title: '', content: '', author: '' }); // Reset form
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ backgroundColor: '#f1f3f4' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
          <Menu.Item key="1" icon={<EditOutlined />}>
            Blog
          </Menu.Item>
          <Menu.Item key="2" icon={<DeleteOutlined />}>
            Trash
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          {selectedPost ? (
            renderPostDetails()
          ) : (
            <>
              <h2>Add New Post</h2>
              <Input
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input
                placeholder="Author"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input.TextArea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleAddPost}>
                Add Post
              </Button>
              <h2 style={{ marginTop: '20px' }}>Blog Posts</h2>
              {renderPostList()}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Blog;
