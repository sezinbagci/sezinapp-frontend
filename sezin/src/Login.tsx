import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password ) {
            setMessage('Lütfen tüm alanları doldurun.');
            return;
        }

        try {
            const res = await fetch('https://www.sezinapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, projectName:"sezin" }), // ✅ projectName dahil
            });

            const data = await res.json();

            if (data.success) {
                // ✅ token anahtarı sezin_token olarak değiştirildi
                localStorage.setItem('sezin_token', data.token || 'default-token');
                navigate('/');
            } else {
                setMessage(data.message || 'Giriş başarısız.');
            }
        } catch (error) {
            console.error('Giriş hatası:', error);
            setMessage('Sunucuya bağlanılamadı.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Giriş Yap</h2>

                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Giriş Yap</button>
                {message && <p style={{ color: 'red' }}>{message}</p>}
            </div>
        </div>
    );
}

export default Login;

