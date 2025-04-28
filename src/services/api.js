import axios from 'axios';

// Base axios instance for all API calls
const api = axios.create({
  baseURL: 'http://192.168.11.150:8080/hktv_ars',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API service for making HTTP requests to the backend
 */
const apiService = {
  /**
   * Analyze address using the backend service
   * @param {string} address - Address to analyze
   * @returns {Promise} - Promise with response data
   */
  analyzeAddress: (address) => {
    return api.get(`/find-hk-addresses?address=${encodeURIComponent(address)}`);
  },

  /**
   * Get paginated address records
   * @param {number} pageNo - Page number
   * @param {number} pageSize - Page size
   * @returns {Promise} - Promise with response data
   */
  getAddressRecords: (pageNo = 1, pageSize = 10) => {
    return api.get(`/records?pageNo=${pageNo}&pageSize=${pageSize}`);
  },

  /**
   * Test Redis connection
   * @returns {Promise} - Promise with response data
   */
  testRedis: () => {
    return api.get('/test-redis');
  },

  /**
   * Send message to RabbitMQ
   * @param {string} message - Message to send
   * @returns {Promise} - Promise with response data
   */
  sendMessage: (message) => {
    return api.get(`/send/${encodeURIComponent(message)}`);
  },
};

export default apiService;