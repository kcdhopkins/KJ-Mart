import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/homepage/Homepage';
import Layout from './components/layout/Layout';
import ShopPageList from './pages/shoppage/ShopPageList';
import { AuthProvider } from './components/authProvider/AuthProvider';
import AccountPage from './pages/accountpage/AccountPage';
import ShopPageProduct from './pages/shoppage/ShopPageProduct';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="shop/:searchTerm/list" element={<ShopPageList />} />
            <Route path="shop/:itemNumber/product" element={<ShopPageProduct />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;