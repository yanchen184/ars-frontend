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
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    return api.get(`/find-hk-addresses?address=${encodeURIComponent(address)}&_t=${timestamp}`);
  },

  /**
   * Get paginated address records
   * @param {number} pageNo - Page number
   * @param {number} pageSize - Page size
   * @returns {Promise} - Promise with response data
   */
  getAddressRecords: (pageNo = 1, pageSize = 10) => {
    const timestamp = new Date().getTime();
    return api.get(`/records?pageNo=${pageNo}&pageSize=${pageSize}&_t=${timestamp}`);
  },

  /**
   * Test Redis connection
   * @returns {Promise} - Promise with response data
   */
  testRedis: () => {
    const timestamp = new Date().getTime();
    return api.get(`/test-redis?_t=${timestamp}`);
  },

  /**
   * Send message to RabbitMQ
   * @param {string} message - Message to send
   * @returns {Promise} - Promise with response data
   */
  sendMessage: (message) => {
    const timestamp = new Date().getTime();
    return api.get(`/send/${encodeURIComponent(message)}?_t=${timestamp}`);
  },
};

// Log the API base URL for debugging
console.log('API Base URL:', api.defaults.baseURL);

export default apiService;