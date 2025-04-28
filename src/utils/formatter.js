/**
 * Format date string to locale date string
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('zh-HK');
};

/**
 * Truncate text if it exceeds max length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format address components into a single string
 * @param {Object} address - Address object
 * @returns {string} - Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const components = [];
  if (address.district) components.push(address.district);
  if (address.estate) components.push(address.estate);
  if (address.street) components.push(address.street);
  if (address.streetNumber) components.push(address.streetNumber);
  
  return components.join(', ');
};