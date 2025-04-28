import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  SearchOutlined,
  TableOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

// Application version - displayed for easy tracking
const APP_VERSION = 'v0.1.7'; // Updated version with forced deployment

/**
 * Main layout component for the application
 * Contains navigation sidebar, header, and content area
 */
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Define menu items for sidebar navigation
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">儀表板</Link>,
    },
    {
      key: '/address-analysis',
      icon: <SearchOutlined />,
      label: <Link to="/address-analysis">地址分析</Link>,
    },
    {
      key: '/address-records',
      icon: <TableOutlined />,
      label: <Link to="/address-records">地址記錄</Link>,
    },
  ];

  return (
    <Layout className="app-container">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo">
          {!collapsed ? 'ARS系統' : 'ARS'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="header-right">
            <div className="user-info">
              管理員用戶
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              style={{ marginRight: 20 }}
            >
              登出
            </Button>
          </div>
          <div className="app-version">{APP_VERSION}</div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ARS 地址解析系統 ©{new Date().getFullYear()} HKTV
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;