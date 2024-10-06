// import React, { useState, useEffect } from 'react';
// import { Table, Button, Card, Modal } from 'antd';
// import axios from 'axios';

// const RequestPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedFish, setSelectedFish] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     // Giả sử bạn có API để lấy danh sách yêu cầu đấu giá
//     axios
//       .get('/api/auction-requests')
//       .then((response) => {
//         setRequests(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching auction requests:', error);
//       });
//   }, []);

//   const handleApprove = (id) => {
//     // Xử lý logic duyệt yêu cầu đấu giá
//     console.log(`Duyệt yêu cầu: ${id}`);
//   };

//   const handleReject = (id) => {
//     // Xử lý logic từ chối yêu cầu đấu giá
//     console.log(`Từ chối yêu cầu: ${id}`);
//   };

//   const columns = [
//     {
//       title: 'Tên cá',
//       dataIndex: 'fishName',
//       key: 'fishName',
//     },
//     {
//       title: 'Loại cá',
//       dataIndex: 'fishType',
//       key: 'fishType',
//     },
//     {
//       title: 'Giá khởi điểm',
//       dataIndex: 'startingPrice',
//       key: 'startingPrice',
//     },
//     {
//       title: 'Trạng thái',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Hành động',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button
//             onClick={() => {
//               setSelectedFish(record);
//               setIsModalVisible(true);
//             }}
//           >
//             Chi tiết
//           </Button>
//           <Button type="primary" onClick={() => handleApprove(record.id)} style={{ marginLeft: 8 }}>
//             Duyệt
//           </Button>
//           <Button type="danger" onClick={() => handleReject(record.id)} style={{ marginLeft: 8 }}>
//             Từ chối
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Card title="Danh sách yêu cầu đấu giá">
//         <Table dataSource={requests} columns={columns} rowKey="id" />
//       </Card>

//       {selectedFish && (
//         <Modal
//           title="Chi tiết yêu cầu"
//           visible={isModalVisible}
//           onCancel={() => setIsModalVisible(false)}
//           footer={null}
//         >
//           <p>
//             <strong>Tên cá:</strong> {selectedFish.fishName}
//           </p>
//           <p>
//             <strong>Loại cá:</strong> {selectedFish.fishType}
//           </p>
//           <p>
//             <strong>Giá khởi điểm:</strong> {selectedFish.startingPrice}
//           </p>
//           <p>
//             <strong>Mô tả:</strong> {selectedFish.description}
//           </p>
//           {/* Nếu có hình ảnh */}
//           <img src={selectedFish.imageUrl} alt={selectedFish.fishName} style={{ width: '100%' }} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default RequestPage;

function RequestPage() {
  return <h2>CÁC CÙM CUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</h2>;
}

export default RequestPage;
