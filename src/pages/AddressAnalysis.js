import React, { useState } from 'react';
import { Input, Button, Card, Divider, Descriptions, Spin, Alert, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import apiService from '../services/api';

const { TextArea } = Input;
const { Title } = Typography;

/**
 * Address Analysis page component
 * Allows users to input and analyze addresses
 */
const AddressAnalysis = () => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle address analysis
   */
  const handleAnalyze = async () => {
    if (!address.trim()) {
      setError('請輸入地址');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await apiService.analyzeAddress(address);
      console.log('API Response:', response.data);
      // Add a success field for UI display
      const resultData = {
        ...response.data.data,
        success: response.data.status === 200
      };
      setResult(resultData);
    } catch (err) {
      console.error('Address analysis error:', err);
      setError('地址分析失敗: ' + (err.response?.data?.message || err.message));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Example address input
  const fillExampleAddress = () => {
    setAddress('香港九龍深水埗欽州街37K西九龍中心16樓1605室');
  };

  // Render result details
  const renderResult = () => {
    if (!result) return null;

    return (
      <Card style={{ marginTop: 20 }}>
        <Title level={4}>解析結果</Title>
        
        <Descriptions bordered column={1}>
          <Descriptions.Item label="分析狀態">
            {result.success ? 
              <span style={{ color: 'green' }}>解析成功</span> : 
              <span style={{ color: 'red' }}>解析失敗</span>
            }
          </Descriptions.Item>
          
          {result.address && (
            <Descriptions.Item label="地址">{result.address}</Descriptions.Item>
          )}
          
          {result.dist && (
            <Descriptions.Item label="區域">{result.dist}</Descriptions.Item>
          )}
          
          {result.estate && (
            <Descriptions.Item label="屋苑">{result.estate}</Descriptions.Item>
          )}
          
          {result.street && (
            <Descriptions.Item label="街道">{result.street}</Descriptions.Item>
          )}
          
          {result.number && (
            <Descriptions.Item label="門牌號碼">{result.number}</Descriptions.Item>
          )}
          
          {result.deliveryZoneCode && (
            <Descriptions.Item label="配送區碼">{result.deliveryZoneCode}</Descriptions.Item>
          )}
          
          {result.latitude && result.longitude && (
            <Descriptions.Item label="經緯度">
              {result.latitude.toString()}, {result.longitude.toString()}
            </Descriptions.Item>
          )}
          
          {result.willDelivery !== undefined && (
            <Descriptions.Item label="可配送">
              {result.willDelivery ? 
                <span style={{ color: 'green' }}>可以配送</span> : 
                <span style={{ color: 'red' }}>無法配送</span>}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    );
  };

  return (
    <div>
      <Title level={2}>地址解析</Title>
      <p>輸入香港地址進行解析，系統將自動識別地址的組成部分。</p>
      
      <Card>
        <TextArea
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="請輸入需要解析的地址..."
          style={{ marginBottom: 16 }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="default" onClick={fillExampleAddress}>
            填充範例地址
          </Button>
          
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={handleAnalyze}
            loading={loading}
          >
            開始解析
          </Button>
        </div>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginTop: 16 }} 
          />
        )}
      </Card>
      
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Spin size="large" />
          <p>正在解析地址，請稍候...</p>
        </div>
      ) : (
        renderResult()
      )}
      
      <Divider />
      
      <Card title="使用說明">
        <p>本系統使用機器學習和自然語言處理技術來解析香港地址。</p>
        <p>您可以輸入完整或部分地址，系統將嘗試識別以下成分：</p>
        <ul>
          <li>區域 (如：九龍、香港島)</li>
          <li>地區 (如：深水埗、灣仔)</li>
          <li>街道名稱 (如：欽州街)</li>
          <li>街道號碼 (如：37K)</li>
          <li>建築物 (如：西九龍中心)</li>
          <li>樓層 (如：16樓)</li>
          <li>單位 (如：1605室)</li>
        </ul>
      </Card>
    </div>
  );
};

export default AddressAnalysis;