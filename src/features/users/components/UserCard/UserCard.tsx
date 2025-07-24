import React from 'react'
import { Card, Button, Space, Typography, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import type { User } from '../../types/user.types'
import { userStoreActions } from '../../store/userStore'
import styles from './UserCard.module.scss'

const { Text, Title } = Typography

interface UserCardProps {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const handleEdit = () => {
    userStoreActions.setSelectedUser(user.id)
    userStoreActions.toggleModal(true)
  }

  const handleDelete = () => {
    // Delete confirmation modal açılabilir
    console.log('Delete user:', user.id)
  }

  return (
    <Card
      className={styles.card}
      actions={[
        <Button 
          key="edit" 
          type="text" 
          icon={<EditOutlined />} 
          onClick={handleEdit}
        >
          Düzenle
        </Button>,
        <Button 
          key="delete" 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={handleDelete}
        >
          Sil
        </Button>,
      ]}
    >
      <div className={styles.cardHeader}>
        <Title level={4} className={styles.userName}>
          {user.name}
        </Title>
        <Tag color="blue">@{user.username}</Tag>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <MailOutlined className={styles.icon} />
            <Text copyable>{user.email}</Text>
          </div>
          
          <div className={styles.infoItem}>
            <PhoneOutlined className={styles.icon} />
            <Text>{user.phone}</Text>
          </div>
        </div>

        <div className={styles.companyInfo}>
          <Text strong>Şirket:</Text>
          <Text className={styles.companyName}>{user.company.name}</Text>
          <Text type="secondary" className={styles.companyCatch}>
            "{user.company.catchPhrase}"
          </Text>
        </div>

        <div className={styles.addressInfo}>
          <Text strong>Adres:</Text>
          <Text className={styles.address}>
            {user.address.street}, {user.address.city}
          </Text>
        </div>
      </div>
    </Card>
  )
}