import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/Cards';
import MyCards from './pages/MyCards';
import CreateCard from './pages/CreateCard';
import EditCard from './pages/EditCard';
import Profile from './pages/Profile';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/my-cards" element={
            <ProtectedRoute requireAuth>
              <MyCards />
            </ProtectedRoute>
          } />
          <Route path="/create-card" element={
            <ProtectedRoute requireBusiness>
              <CreateCard />
            </ProtectedRoute>
          } />
          <Route path="/edit-card/:id" element={
            <ProtectedRoute requireAuth>
              <EditCard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute requireAuth>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute requireAdmin>
              <Users />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
