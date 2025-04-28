/**
 * Application constants
 */

// Application version - used for display in the UI
export const APP_VERSION = 'v0.1.0';

// API endpoints
export const API_ENDPOINTS = {
  ANALYZE_ADDRESS: '/find-hk-addresses',
  GET_RECORDS: '/records',
  TEST_REDIS: '/test-redis',
  SEND_MESSAGE: '/send',
};

// Status colors
export const STATUS_COLORS = {
  SUCCESS: '#52c41a',
  ERROR: '#f5222d',
  WARNING: '#faad14',
  INFO: '#1890ff',
};

// Table pagination options
export const PAGINATION_OPTIONS = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
};

// Date format options
export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD HH:mm:ss',
  SHORT: 'YYYY-MM-DD',
};

// Confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,    // 80% and above is high confidence
  MEDIUM: 0.5,  // 50% to 80% is medium confidence
  LOW: 0.3,     // Below 50% is low confidence
};