import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [version, setVersion] = useState<string>('Yükleniyor...');
    const navigate = useNavigate();
    const location = useLocation();
    const token =localStorage.getItem('sezin_token')
    const handleLogout = () => {
        // ✅ token anahtarı sezin_token olarak değiştirildi
        localStorage.removeItem('sezin_token');
        navigate('/login');
    };

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const res = await fetch('https://www.sezinapp.com/api/version',{
                    headers:{Authorization: `Bearer ${token}`}
                });
                const text = await res.text(); // düz yazı geliyor
                setVersion(text || 'Versiyon bulunamadı');
            } catch (error) {
                console.error('Versiyon bilgisi alınamadı:', error);
                setVersion('Versiyon alınamadı');
            }
        };

        fetchVersion();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/users',
                            icon: <UserOutlined />,
                            label: <Link to="/users">Kullanıcılar</Link>,
                        },
                    ]}
                />
                <div style={{ color: 'white', textAlign: 'center', padding: '16px 0', marginTop: 'auto' }}>
                    {version}
                </div>
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: '0 16px',
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px' }}
                    />
                    <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                        Çıkış Yap
                    </Button>
                </Header>

                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                    {children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Sezin
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

