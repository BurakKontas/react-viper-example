import React from 'react'
import { Card, Input, Select, Button, Space, Spin, Alert } from 'antd'
import { SearchOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useUsers } from '../../hooks/useUsers'
import { userStoreActions, useStore } from '../../store/userStore'
import { UserCard } from '../UserCard/UserCard'
import styles from './UserList.module.scss'

const { Search } = Input
const { Option } = Select

export const UserList: React.FC = () => {
  const { filters } = useStore()
  const { users, isLoading, error } = useUsers()

  const handleSearchChange = (value: string) => {
    userStoreActions.setFilters({ search: value })
  }

  const handleSortChange = (sortBy: string) => {
    userStoreActions.setFilters({ sortBy: sortBy as any })
  }

  const handleSortOrderChange = (sortOrder: string) => {
    userStoreActions.setFilters({ sortOrder: sortOrder as any })
  }

  if (error) {
    return (
      <Alert
        message="Hata"
        description="Kullanıcılar yüklenirken bir hata oluştu."
        type="error"
        showIcon
        className={styles.alert}
      />
    )
  }

  return (
    <div className={styles.container}>
      <Card className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <h2>Kullanıcılar</h2>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => userStoreActions.toggleModal(true)}
            >
              Yeni Kullanıcı
            </Button>
            <Button icon={<ReloadOutlined />}>Yenile</Button>
          </Space>
        </div>

        <div className={styles.filters}>
          <Search
            placeholder="Kullanıcı ara..."
            allowClear
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />

          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <Option value="name">İsme göre</Option>
            <Option value="email">E-posta'ya göre</Option>
            <Option value="company">Şirkete göre</Option>
          </Select>

          <Select
            value={filters.sortOrder}
            onChange={handleSortOrderChange}
            className={styles.sortSelect}
          >
            <Option value="asc">Artan</Option>
            <Option value="desc">Azalan</Option>
          </Select>

          <Button onClick={userStoreActions.resetFilters}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.userGrid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {users.length === 0 && !isLoading && (
        <div className={styles.noData}>
          <p>Kullanıcı bulunamadı.</p>
        </div>
      )}
    </div>
  )
}