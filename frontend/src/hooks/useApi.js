import { useState, useEffect } from 'react';

/**
 * Custom hook for API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Bir hata oluştu');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, dependencies);
  
  return { data, loading, error };
};

/**
 * Custom hook for manual API calls (e.g., form submissions)
 */
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const mutate = async (apiFunction, data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await apiFunction(data);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message || 'Bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };
  
  return { mutate, loading, error, success, reset };
};



