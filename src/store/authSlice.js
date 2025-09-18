import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLanguage } from '../utils/i18n';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/login`, credentials, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      
      // إذا كان الكود 415، معناه المستخدم محتاج يفعل حسابه
      if (response.data.code === 415) {
        return response.data; // نرجع البيانات عشان نودي المستخدم للـ OTP
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/verify-otp`, otpData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (phoneData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/resend-otp`, phoneData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (phoneData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/forgot/password`, phoneData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      console.log('forgotPassword API response:', response.data);
      // إرجاع الـ response مع الـ phone من الـ request
      return { ...response.data, phone: phoneData.phone };
    } catch (error) {
      console.log('forgotPassword API error:', error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify Forgot Password OTP
export const verifyForgotPasswordOTP = createAsyncThunk(
  'auth/verifyForgotPasswordOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/forgot/verify-otp`, otpData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Resend Forgot Password OTP
export const resendForgotPasswordOTP = createAsyncThunk(
  'auth/resendForgotPasswordOTP',
  async (phoneData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/forgot/resend-otp`, phoneData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const currentLanguage = getLanguage();
      const response = await axios.post(`${BASE_URL}/forgot/reset-password`, passwordData, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  phone: null,
  loading: false,
  error: null,
  success: false,
  resendSuccess: false,
  needsVerification: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.phone = null;
      state.error = null;
      state.success = false;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearResendSuccess: (state) => {
      state.resendSuccess = false;
    },
    clearNeedsVerification: (state) => {
      state.needsVerification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.phone = action.payload.data.phone;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.phone = action.payload.data.phone;
        state.error = null;
        
        // إذا كان الكود 415، نحفظ المعلومة عشان نعرف إن المستخدم محتاج يفعل حسابه
        if (action.payload.code === 415) {
          state.needsVerification = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.resendSuccess = true;
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log('forgotPassword.fulfilled:', action.payload);
        state.loading = false;
        state.success = true;
        // حفظ الـ phone من الـ payload
        state.phone = action.payload.phone;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify Forgot Password OTP
      .addCase(verifyForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Resend Forgot Password OTP
      .addCase(resendForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendForgotPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.resendSuccess = true;
        state.error = null;
      })
      .addCase(resendForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, setPhone, clearAuth, clearResendSuccess, clearNeedsVerification } = authSlice.actions;
export default authSlice.reducer;
