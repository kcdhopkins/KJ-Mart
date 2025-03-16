import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/homepage/Homepage';
import Layout from './components/layout/Layout';
import ShopPage from './pages/shoppage/ShopPage';
import { AuthProvider } from './components/authProvider/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;