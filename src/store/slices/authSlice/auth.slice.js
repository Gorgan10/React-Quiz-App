import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearFormControlsHandler, createFormControl } from './formControls';
import { validateForm } from '../../../form/formFramework';
import { validateControl } from './authUtils';

const initialState = {
  formControls: {
    email: createFormControl(
      'Email',
      'email',
      'Invalid Email',
      { required: true, email: true }
    ),
    password: createFormControl(
      'Password',
      'password',
      'Invalid Password',
      { required: true, minLength: 6 }
    )
  },
  token: null,
  userId: null,
  expirationDate: null,
  isFormValid: false,
  error: null,
  logoutTimer: null,
  isAuthenticated: !!localStorage.getItem('token')
};

export const authHandler = createAsyncThunk(
  'auth/authHandler',
  async ({ formControls, API_ENDPOINT }, { dispatch, rejectWithValue }) => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(API_ENDPOINT, authData);
      const { idToken, localId, expiresIn } = response.data;
      dispatch(setLogoutTimer(expiresIn * 1000));
      return { idToken, localId, expiresIn };
    } catch (e) {
      const errorMessage = e.response?.data?.error?.message || 'Authentication failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const setLogoutTimer = createAsyncThunk(
  'auth/setLogoutTimer',
  async (timeout, { dispatch }) => {
    const timer = setTimeout(() => {
      dispatch(logout());
    }, timeout);
    return timer;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSubmit: state => {
      state.isFormValid = false;
    },
    updateControls: (state, action) => {
      const { value, controlName } = action.payload;
      state.formControls[controlName].value = value;
      state.formControls[controlName].touched = true;
      state.formControls[controlName].valid = validateControl(value, state.formControls[controlName].rules);
      state.isFormValid = validateForm(state.formControls);
      state.error = null;
    },
    logout: state => {
      state.token = null;
      state.userId = null;
      state.expirationDate = null;
      state.isAuthenticated = false;
      if (state.logoutTimer) {
        clearTimeout(state.logoutTimer);
        state.logoutTimer = null;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationDate = action.payload.expirationDate;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authHandler.pending, (state) => {
        state.error = null;
      })
      .addCase(authHandler.fulfilled, (state, action) => {
        const { idToken, localId, expiresIn } = action.payload;
        state.token = idToken;
        state.userId = localId;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();
        state.expirationDate = expirationDate;
        state.isAuthenticated = true;

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', localId);
        localStorage.setItem('expirationDate', expirationDate);

        state.formControls = clearFormControlsHandler();
      })
      .addCase(authHandler.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.formControls = clearFormControlsHandler();
      })
      .addCase(setLogoutTimer.fulfilled, (state, action) => {
        state.logoutTimer = action.payload;
      });
  }
});

export const { onSubmit, updateControls, logout, authSuccess } = authSlice.actions;

export default authSlice.reducer;
