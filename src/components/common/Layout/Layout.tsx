import React from 'react'
import { Layout as AntLayout, Menu, Typography } from 'antd'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'
import { Link, useLocation } from '@tanstack/react-router'
import styles from './Layout.module.scss'

const { Header, Content, Sider } = AntLayout
const { Title } = Typography

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Ana Sayfa</Link>,
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: <Link to="/users">Kullanıcılar</Link>,
    },
  ]

  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={3} className={styles.title}>
          TanStack Demo
        </Title>
      </Header>
      
      <AntLayout>
        <Sider className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className={styles.menu}
          />
        </Sider>
        
        <Content className={styles.content}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}