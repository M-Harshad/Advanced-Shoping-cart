import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet, NavLink } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};



const DashBord: React.FC = () => {
  const {
    token: {},
  } = theme.useToken();

  return (
    <Layout hasSider>
    <Sider style={siderStyle}>
    <div style={{ padding: '16px' }}>
          <NavLink
            to="products" // Change this to your actual route
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 16px',
              color: isActive ? 'white' : 'white',
              backgroundColor: isActive ? '#1890ff' : 'transparent',
              borderRadius: '4px',
              textDecoration: 'none',
            })}
          >
            <p>Products</p>
          </NavLink>
          
        </div>
      </Sider>

      <Layout style={{ marginInlineStart: 200 }}>

        <Content style={{ overflow: 'initial' }}>
          <div className='min-h-[650px] m-20'>
            <Outlet />

          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} HR
        </Footer>

      </Layout>

    </Layout>
  );
};

export default DashBord;