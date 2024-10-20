import React from 'react';
import { Modal, Button } from 'antd';

const ApproveAuction = ({ visible, onApprove, onReject, onCancel, auction }) => {
  return (
    <Modal
      title="Approve / Reject Auction"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="approve" type="primary" onClick={onApprove}>
          Approve
        </Button>,
        <Button key="reject" type="danger" onClick={onReject}>
          Reject
        </Button>,
      ]}
    >
      {auction ? (
        <div>
          <p>
            <strong>ID of Koi Fish: </strong> {auction.auction.id}
          </p>
          <p>
            <strong>Starting Price:</strong> {auction.auction.startingPrice}
          </p>
          <p>
            <strong>Buy Now Price:</strong> {auction.auction.buyoutPrice}
          </p>
          <p>Do you want to approve or reject this auction request?</p>
        </div>
      ) : (
        <p>No action data available</p>
      )}
    </Modal>
  );
};

export default ApproveAuction;
