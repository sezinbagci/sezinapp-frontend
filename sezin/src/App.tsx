import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainLayout from './MainLayout';
import Users from './Users';
import ProtectedRoutes from './ProtectedRoutes'; // doğru dosya adı bu

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoutes>
                        <MainLayout>
                            <div>
                                <h2>Hoş geldin!</h2>
                                <p>Ana sayfaya giriş yaptın.</p>
                            </div>
                        </MainLayout>
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/users"
                element={
                    <ProtectedRoutes>
                        <MainLayout>
                            <Users />
                        </MainLayout>
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
}

export default App;


