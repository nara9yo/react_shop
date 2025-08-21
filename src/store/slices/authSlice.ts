// 인증 상태 관리 슬라이스
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';
import { signIn, signUp, logOut, onAuthStateChange } from '../../services/auth';

// 초기 상태
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// 비동기 액션: 로그인
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await signIn(email, password);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 액션: 회원가입
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { email, password, displayName }: { email: string; password: string; displayName?: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await signUp(email, password, displayName);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 비동기 액션: 로그아웃
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await logOut();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// 인증 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 사용자 설정 (Firebase 인증 상태 변경 시 사용)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // 로딩 상태 설정
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // 에러 초기화
    clearError: (state) => {
      state.error = null;
    },
    // 인증 상태 초기화
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // 회원가입
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // 로그아웃
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션 내보내기
export const { setUser, setLoading, clearError, resetAuth } = authSlice.actions;

// 리듀서 내보내기
export default authSlice.reducer;
