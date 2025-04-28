import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Typography, Card, DatePicker, Tag, message } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons';
import apiService from '../services/api';
import { formatDate } from '../utils/formatter';

const { Title } = Typography;
const { RangePicker } = DatePicker;

/**
 * Address Records page component
 * Displays a table of all address records with pagination and filtering
 */
const AddressRecords = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');

  /**
   * Fetch address records from the API
   * @param {number} pageNo - Page number
   * @param {number} pageSize - Page size
   */
  const fetchRecords = async (pageNo = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await apiService.getAddressRecords(pageNo, pageSize);
      setData(response.data.data || []);
      setPagination({
        current: pageNo,
        pageSize: pageSize,
        total: response.data.total || 0,
      });
    } catch (error) {
      console.error('Error fetching records:', error);
      message.error('獲取地址記錄失敗');
    } finally {
      setLoading(false);
    }
  };

  // Load records on initial mount
  useEffect(() => {
    fetchRecords();
  }, []);

  /**
   * Handle table pagination change
   * @param {Object} pagination - Pagination object
   */
  const handleTableChange = (pagination) => {
    fetchRecords(pagination.current, pagination.pageSize);
  };

  /**
   * Handle search action
   */
  const handleSearch = () => {
    fetchRecords(1, pagination.pageSize);
  };

  /**
   * Export current data to CSV
   */
  const handleExport = () => {
    if (data.length === 0) {
      message.warning('無數據可導出');
      return;
    }

    // Generate CSV content
    const headers = ['ID', '地址', '接收時間', '處理結果', '置信度'];
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        `"${item.address.replace(/"/g, '""')}"`, // Escape quotes in CSV
        item.receiveTime,
        item.success ? '成功' : '失敗',
        item.confidence || 'N/A'
      ].join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `address_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '接收時間',
      dataIndex: 'receiveTime',
      key: 'receiveTime',
      render: (text) => formatDate(text),
    },
    {
      title: '處理結果',
      dataIndex: 'success',
      key: 'success',
      render: (success) => (
        success ? 
          <Tag color="success">成功</Tag> : 
          <Tag color="error">失敗</Tag>
      ),
      width: 120,
    },
    {
      title: '置信度',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence) => confidence ? `${(confidence * 100).toFixed(2)}%` : 'N/A',
      width: 120,
    },
    {
      title: '詳情',
      key: 'action',
      render: (_, record) => (
        <Button type="link" size="small">
          查看詳情
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <Title level={2}>地址記錄</Title>
      <p>顯示所有已處理的地址記錄和解析結果。</p>
      
      <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Input 
            placeholder="搜索地址" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            onPressEnter={handleSearch}
          />
          <RangePicker placeholder={['開始日期', '結束日期']} />
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            搜索
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchText('');
              fetchRecords();
            }}
          >
            重置
          </Button>
          <Button 
            type="primary" 
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            導出CSV
          </Button>
        </Space>
        
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default AddressRecords;