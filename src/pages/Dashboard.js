import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { ArrowUpOutlined, SearchOutlined, DatabaseOutlined, CloudServerOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

/**
 * Dashboard page component
 * Shows system overview and statistics
 */
const Dashboard = () => {
  const navigate = useNavigate();
  
  // Test Redis connection
  const handleTestRedis = async () => {
    try {
      const response = await apiService.testRedis();
      alert(`Redis測試成功: ${response.data}`);
    } catch (error) {
      alert('Redis測試失敗: ' + error.message);
    }
  };

  // Test RabbitMQ connection
  const handleTestRabbitMQ = async () => {
    try {
      const message = `test-message-${Date.now()}`;
      const response = await apiService.sendMessage(message);
      alert(`RabbitMQ測試成功: ${response.data}`);
    } catch (error) {
      alert('RabbitMQ測試失敗: ' + error.message);
    }
  };

  return (
    <div>
      <h1>系統儀表板</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="地址解析成功率"
              value={98.2}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日解析請求"
              value={1238}
              valueStyle={{ color: '#0050b3' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="系統總記錄數"
              value={82456}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="地址解析" extra={<Button type="primary" icon={<SearchOutlined />} onClick={() => navigate('/address-analysis')}>前往</Button>}>
            <p>針對香港地址進行結構解析，將非結構化地址轉換為結構化資料。</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="地址記錄" extra={<Button type="primary" icon={<DatabaseOutlined />} onClick={() => navigate('/address-records')}>前往</Button>}>
            <p>查看所有已處理的地址記錄和結果，支持分頁瀏覽和搜索。</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="系統連接測試" extra={<CloudServerOutlined />}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleTestRedis}>
              測試Redis
            </Button>
            <Button onClick={handleTestRabbitMQ}>
              測試RabbitMQ
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;