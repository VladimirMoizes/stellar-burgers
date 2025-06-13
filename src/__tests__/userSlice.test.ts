import { TUser } from '@utils-types';
import userReducer, {
  loginUser,
  authChecked
} from '../services/slices/userSlice';

const mockUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь'
} as TUser;

describe('userSlice редьюсер', () => {
  const initialState = {
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

  it('устанавливает данные пользователя и isAuthenticated при успехе', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.data).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  it('ставит loginUserRequest в true при pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  it('устанавливает ошибку и loginUserRequest в false при ошибке', () => {
    const errorMessage = 'Ошибка авторизации';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);
    expect(state.loginUserError).toBe(errorMessage);
    expect(state.loginUserRequest).toBe(false);
  });

  it('устанавливает isAuthChecked в true при вызове authChecked', () => {
    const action = authChecked();
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });
});
