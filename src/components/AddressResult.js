import React from 'react';
import { Descriptions, Tag } from 'antd';
import PropTypes from 'prop-types';

/**
 * Address Result component
 * Displays address analysis results in a formatted way
 */
const AddressResult = ({ result }) => {
  if (!result) return null;
  
  // Format confidence value for display
  const confidencePercent = result.confidence 
    ? `${(result.confidence * 100).toFixed(2)}%` 
    : 'N/A';
  
  // Determine status color based on success flag
  const statusColor = result.success ? 'green' : 'red';
  const statusText = result.success ? '解析成功' : '解析失敗';

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="解析狀態">
        <Tag color={statusColor}>{statusText}</Tag>
      </Descriptions.Item>
      
      {result.district && (
        <Descriptions.Item label="區域">{result.district}</Descriptions.Item>
      )}
      
      {result.region && (
        <Descriptions.Item label="地區">{result.region}</Descriptions.Item>
      )}
      
      {result.estate && (
        <Descriptions.Item label="屋苑">{result.estate}</Descriptions.Item>
      )}
      
      {result.street && (
        <Descriptions.Item label="街道">{result.street}</Descriptions.Item>
      )}
      
      {result.streetNumber && (
        <Descriptions.Item label="街道號碼">{result.streetNumber}</Descriptions.Item>
      )}
      
      {result.building && (
        <Descriptions.Item label="建築物">{result.building}</Descriptions.Item>
      )}
      
      {result.floor && (
        <Descriptions.Item label="樓層">{result.floor}</Descriptions.Item>
      )}
      
      {result.unit && (
        <Descriptions.Item label="單位">{result.unit}</Descriptions.Item>
      )}
      
      <Descriptions.Item label="置信度">{confidencePercent}</Descriptions.Item>
    </Descriptions>
  );
};

// PropTypes for type checking
AddressResult.propTypes = {
  result: PropTypes.shape({
    success: PropTypes.bool,
    district: PropTypes.string,
    region: PropTypes.string,
    estate: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    building: PropTypes.string,
    floor: PropTypes.string,
    unit: PropTypes.string,
    confidence: PropTypes.number
  })
};

export default AddressResult;