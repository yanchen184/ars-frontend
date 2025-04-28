import React from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/es/locale/zh_TW';

// 導入頁面
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AddressAnalysis from './pages/AddressAnalysis';
import AddressRecords from './pages/AddressRecords';
import './App.css';

// Check if the app is running on GitHub Pages
const isGitHubPages = window.location.hostname === 'yanchen184.github.io';

// Main App component
function App() {
  // Use HashRouter for GitHub Pages deployment to avoid 404 errors
  const RouterComponent = isGitHubPages ? HashRouter : Router;
  
  return (
    <ConfigProvider locale={zhTW}>
      <RouterComponent>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="address-analysis" element={<AddressAnalysis />} />
            <Route path="address-records" element={<AddressRecords />} />
          </Route>
        </Routes>
      </RouterComponent>
    </ConfigProvider>
  );
}

export default App;