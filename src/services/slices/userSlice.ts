import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  registerUserRequest: boolean;
  getUserError: string | null;
  getUserRequest: boolean;
  resetPasswordRequest: boolean;
  resetPasswordError: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false,
  getUserError: null,
  getUserRequest: false,
  resetPasswordRequest: false,
  resetPasswordError: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', { expires: -1 });
});

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUserSelectors: (state) => state
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка авторизации';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.error.message || 'Ошибка регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
      })

      // Получение данных пользователя
      .addCase(getUser.pending, (state) => {
        state.getUserRequest = true;
        state.getUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserRequest = false;
        state.getUserError = action.error.message || 'Ошибка получения данных';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
        state.isAuthenticated = true;
      })

      // Обновление данных
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // Сброс (обновление) пароля
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequest = true;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordRequest = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordRequest = false;
        state.resetPasswordError =
          action.error.message || 'Ошибка сброса пароля';
      })

      // Выход
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const { getUserSelectors } = userSlice.selectors;
export default userSlice.reducer;
