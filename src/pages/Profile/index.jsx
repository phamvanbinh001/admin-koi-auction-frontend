import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import styles from './index.module.scss';
import api from '../../configs/api';
import { addressApi } from '../../configs/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const { Option } = Select;

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [editableDetails, setEditableDetails] = useState({
    fullName: '',
    userName: '',
    phoneNumber: '',
    province: '',
    district: '',
  });

  const [provinces, setProvinces] = useState('');
  const [districts, setDistricts] = useState([]);
  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await api.get('/user/get-profile', {
          requireAuth: true,
        });

        const userData = res.data;
        let decodedAddress = 'N/A';

        if (userData.address) {
          try {
            const parsedAddress = JSON.parse(userData.address);
            decodedAddress = `${parsedAddress.province}, ${parsedAddress.district}`;
          } catch (error) {
            decodedAddress = userData.address;
          }
        }

        setUserDetails({
          ...userData,
          address: decodedAddress,
        });

        setEditableDetails({
          fullName: userData.fullName || '',
          userName: userData.userName || '',
          phoneNumber: userData.phoneNumber || '',
          province: '',
          district: '',
        });
      } catch (error) {
        console.log('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProvinces = async () => {
      try {
        const res = await addressApi.get('/1/0.htm');
        setProvinces(res.data.data);
      } catch (error) {
        console.log('Error fetching provinces:', error);
      }
    };

    fetchUserDetails();
    fetchProvinces();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const fetchDistricts = async (provinceId) => {
    try {
      const res = await addressApi.get(`/2/${provinceId}.htm`);
      setDistricts(res.data.data);
    } catch (error) {
      console.log('Error fetching districts:', error);
    }
  };

  const handleProvinceChange = (value) => {
    setEditableDetails((prevState) => ({
      ...prevState,
      province: value,
    }));
    fetchDistricts(value);
  };

  const handleDistrictChange = (value) => {
    setEditableDetails((prevState) => ({
      ...prevState,
      district: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsFormModified(true); // Đánh dấu form đã bị thay đổi
  };

  const handleSaveChanges = async () => {
    // Logic to save changes here
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainBody}>
        <div className={styles.row}>
          <div className={styles.colLg4}>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.profileSection}>
                  <img
                    src={userDetails.role === 'Admin' ? 'src/assets/adminAvt.png' : 'src/assets/staffAvt.png'}
                    alt="Avatar"
                    className={styles.profileImage}
                  />
                  <div className={styles.profileInfo}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className={userDetails.role === 'Admin' ? styles.blueTick : styles.grayTick}
                    />
                    <h2 className={styles.profileName}>{userDetails.fullName}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.readOnlySection}>
              <FormField label="Role" value={userDetails.role} readOnly={true} />
              <FormField label="Email" value={userDetails.email} readOnly={true} />
              <FormField
                label="Created At"
                value={userDetails.createAt ? new Date(userDetails.createAt).toLocaleString() : 'N/A'}
                readOnly={true}
              />
            </div>
          </div>
          <div className={styles.colLg8}>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={editableDetails.fullName}
                  onChange={handleInputChange}
                  readOnly={false}
                />
                <FormField
                  label="Username"
                  name="userName"
                  value={editableDetails.userName}
                  onChange={handleInputChange}
                  readOnly={false}
                />
                <FormField
                  label="Phone"
                  name="phoneNumber"
                  value={editableDetails.phoneNumber}
                  onChange={handleInputChange}
                  readOnly={false}
                />

                {/* Dropdown Tỉnh/Thành */}
                <div className={styles.rowMb3}>
                  <div className={styles.colSm3}>
                    <h6 className={`${styles.mb0} ${styles.largeLabel}`}>Province</h6>
                  </div>
                  <div className={styles.colSm9}>
                    {provinces.length > 0 ? (
                      <Select
                        value={editableDetails.province}
                        onChange={handleProvinceChange}
                        style={{ width: '100%' }}
                      >
                        {provinces.map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <p>Loading . . .</p>
                    )}
                  </div>
                </div>

                {/* Dropdown Quận/Huyện */}
                <div className={styles.rowMb3}>
                  <div className={styles.colSm3}>
                    <h6 className={`${styles.mb0} ${styles.largeLabel}`}>District</h6>
                  </div>
                  <div className={styles.colSm9}>
                    <Select
                      value={editableDetails.district}
                      onChange={handleDistrictChange}
                      style={{ width: '100%' }}
                      disabled={!editableDetails.province}
                    >
                      {districts.map((district) => (
                        <Option key={district.id} value={district.id}>
                          {district.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <FormField
                  label="Address"
                  name="address"
                  value={editableDetails.address}
                  onChange={handleInputChange}
                  readOnly={false}
                />

                <div className={styles.row}>
                  <Button type="primary" className={styles.saveButton} onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, readOnly = false }) => (
  <div className={styles.rowMb3}>
    <div className={styles.colSm3}>
      <h6 className={`${styles.mb0} ${styles.largeLabel}`}>{label}</h6>
    </div>
    <div className={styles.colSm9}>
      <Input name={name} onChange={onChange} readOnly={readOnly} value={value} />
    </div>
  </div>
);

export default Profile;
