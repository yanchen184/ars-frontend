import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/es/locale/zh_TW';

// 導入頁面
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AddressAnalysis from './pages/AddressAnalysis';
import AddressRecords from './pages/AddressRecords';
import './App.css';

// Main App component
function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="address-analysis" element={<AddressAnalysis />} />
            <Route path="address-records" element={<AddressRecords />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;