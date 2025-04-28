import React from 'react';
import { Card, Statistic } from 'antd';
import PropTypes from 'prop-types';

/**
 * StatusCard component
 * Displays a statistic card with customizable features
 */
const StatusCard = ({ title, value, suffix, prefix, precision, valueStyle }) => {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={valueStyle}
        prefix={prefix}
        suffix={suffix}
      />
    </Card>
  );
};

// PropTypes for type checking
StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  precision: PropTypes.number,
  valueStyle: PropTypes.object
};

// Default props
StatusCard.defaultProps = {
  precision: 0,
  valueStyle: {}
};

export default StatusCard;