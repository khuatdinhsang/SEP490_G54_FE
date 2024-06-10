import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/auth';
import { LoginData, LoginResponse } from '../constant/type/auth';
import { ResponseForm } from '../constant/type';
import axios from 'axios';

export interface UserCounterStep {
  date: string; // YYYY-MM-DD
  step: number;
}
export interface User {
  id?: string;
  counterStep: UserCounterStep[];
  token: string
}
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user: LoginData, { rejectWithValue }) => {
    try {
      const res = await authService.login(user);
      return res;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.response)
    }
  }
);
interface InitialState {
  id: string;
  counterStep: UserCounterStep[];
  token: string
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    id: undefined,
    counterStep: [],
    token: ""
  },
  reducers: {
    initUser: (state: User, action: PayloadAction<InitialState>) => {
      state.id = action.payload.id;
      state.counterStep = action.payload.counterStep;
    },
    updateCounterStep: (state, action) => { },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      console.log('49 loading');
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<ResponseForm<LoginResponse>>) => {
        console.log("54", action.payload);
        state.token = action.payload?.result.token;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("59", action.error);
    });
  },
});
export const { updateCounterStep, initUser } = userSlice.actions;
export default userSlice.reducer;
