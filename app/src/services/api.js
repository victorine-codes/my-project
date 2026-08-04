import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DEFAULT_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_BASE_URL;

export const getStoredAuth = async () => {
  try {
    const [token, user] = await Promise.all([
      AsyncStorage.getItem('userToken'),
      AsyncStorage.getItem('user')
    ]);
    return { token, user: user ? JSON.parse(user) : null };
  } catch (error) {
    return { token: null, user: null };
  }
};

export const storeAuth = async (token, user) => {
  await Promise.all([
    AsyncStorage.setItem('userToken', token),
    AsyncStorage.setItem('user', JSON.stringify(user))
  ]);
};

export const clearAuth = async () => {
  await AsyncStorage.multiRemove(['userToken', 'user', 'refreshToken']);
};

export const apiRequest = async (endpoint, options = {}) => {
  const { auth = true, method = 'GET', body, headers = {} } = options;
  const { token } = await getStoredAuth();

  const requestHeaders = {
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined
    });

    const responseBody = await response.text();
    let data = {};
    try {
      data = responseBody ? JSON.parse(responseBody) : {};
    } catch (error) {
      data = { message: responseBody };
    }

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Request failed');
  }
};

export const loginUser = (email, password) => apiRequest('/api/auth/login', {
  method: 'POST',
  auth: false,
  body: { email, password }
});

export const registerUser = (payload) => apiRequest('/api/auth/register', {
  method: 'POST',
  auth: false,
  body: payload
});

export const getProfile = () => apiRequest('/api/auth/profile');
export const getReminders = () => apiRequest('/api/reminders');
export const getMedications = () => apiRequest('/api/medications');
export const getAppointments = () => apiRequest('/api/appointments');
