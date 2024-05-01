const API_URL = process.env.REACT_APP_IDENTITY_API_URL || 'https://identitytoolkit.googleapis.com/v1/accounts';

export const API_ENDPOINTS = {
  SIGN_UP: `${API_URL}:signUp?key=${process.env.REACT_APP_API_KEY}`,
  SIGN_IN: `${API_URL}:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
};
