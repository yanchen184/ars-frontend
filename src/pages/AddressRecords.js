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
      console.log('Fetching records with pageNo:', pageNo, 'pageSize:', pageSize);
      const response = await apiService.getAddressRecords(pageNo, pageSize);
      console.log('API Response for records (raw):', response);
      
      // 查看真實返回的數據結構
      const apiResponse = response.data;
      console.log('API Response structure:', apiResponse);
      
      // 檢查是否有包含狀態碼的標準封裝結構
      if (apiResponse && apiResponse.status === 200 && apiResponse.data) {
        console.log('Using standard API wrapper structure');
        
        // 檢查真正的數據封裝
        const realData = apiResponse.data;
        
        if (realData && Array.isArray(realData.list)) {
          console.log('Found list data in response.data.data:', realData.list);
          setData(realData.list || []);
          
          // 設置分頁信息
          const paginationInfo = realData.pagination || {};
          setPagination({
            current: paginationInfo.currentPage || pageNo,
            pageSize: paginationInfo.pageSize || pageSize,
            total: paginationInfo.totalElements || 0,
          });
        } else {
          console.warn('Could not find list data in the expected structure');
          setData([]);
        }
      } else if (apiResponse && Array.isArray(apiResponse.list)) {
        // 直接的 PaginationResultData 格式
        console.log('Found PaginationResultData directly in response.data');
        setData(apiResponse.list || []);
        
        const paginationInfo = apiResponse.pagination || {};
        setPagination({
          current: paginationInfo.currentPage || pageNo,
          pageSize: paginationInfo.pageSize || pageSize,
          total: paginationInfo.totalElements || 0,
        });
      } else {
        console.warn('Unexpected data structure. Setting empty data.');
        setData([]);
        setPagination({
          current: pageNo,
          pageSize: pageSize,
          total: 0,
        });
      }
      
      // 在選染後週期中檢查數據狀態
      setTimeout(() => {
        console.log('Current data state after processing:', data);
      }, 0);
      
    } catch (error) {
      console.error('Error fetching records:', error);
      message.error('獲取地址記錄失敗');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load records on initial mount and whenever dependencies change
  useEffect(() => {
    fetchRecords();
    
    // Debug log to show when the effect is triggered
    console.log('useEffect triggered, fetching records');
  }, []); // Empty dependency array means this effect runs once on mount
  
  // Debug effect to log data changes
  useEffect(() => {
    console.log('Data changed:', data);
  }, [data]);

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
    const headers = ['ID', '地址', '接收時間', '區域', '街道', '配送區碼'];
    const csvContent = [
      headers.join(','),
      ...data.map((item, index) => [
        (index + 1),
        `"${(item.address || '').replace(/"/g, '""')}"`, // Escape quotes in CSV
        item.receiveTime || '',
        item.district || '',
        item.street || '',
        item.originalDeliveryZoneCode || ''
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
    
    message.success('數據導出成功');
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 80,
      render: (_, __, index) => index + 1,
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
      render: (text) => text ? formatDate(text) : 'N/A',
    },
    {
      title: '區域',
      dataIndex: 'district',
      key: 'district',
      render: (text) => text || 'N/A',
    },
    {
      title: '街道',
      dataIndex: 'street',
      key: 'street',
      render: (text) => text || 'N/A',
    },
    {
      title: '配送區編碼',
      dataIndex: 'originalDeliveryZoneCode',
      key: 'originalDeliveryZoneCode',
      render: (text) => text || 'N/A',
    },
    {
      title: '是否配送',
      dataIndex: 'willDeliver',
      key: 'willDeliver',
      render: (text) => {
        if (text === 'true' || text === true) {
          return <Tag color="success">可配送</Tag>;
        } else if (text === 'false' || text === false) {
          return <Tag color="error">不可配送</Tag>;
        }
        return <Tag color="default">N/A</Tag>;
      },
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
          rowKey={(record, index) => index}
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