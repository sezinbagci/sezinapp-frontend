import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';

const { Title } = Typography;

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isactive: boolean;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    // ✅ token anahtarı sezin_token olarak değiştirildi
    const token = localStorage.getItem('sezin_token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://www.sezinapp.com/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError('Kullanıcılar alınamadı.');
                console.error(err);
            }
        };

        fetchUsers();
    }, [token]); // ✅ token değişirse tekrar çalışması için dependency eklendi

    const columns = [
        { title: 'Ad Soyad', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Yaş', dataIndex: 'age', key: 'age' },
        {
            title: 'Aktif mi?',
            dataIndex: 'isactive',
            key: 'isactive',
            render: (isActive: boolean) => (isActive ? 'Evet' : 'Hayır'),
        },
    ];

    return (
        <>
            <Title level={3}>Kullanıcı Listesi</Title>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <Table dataSource={users} columns={columns} rowKey="id" />
            )}
        </>
    );
};

export default Users;
