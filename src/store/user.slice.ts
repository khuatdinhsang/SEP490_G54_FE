import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserCounterStep {
  date: string; // YYYY-MM-DD
  step: number;
}
export interface User {
  id?: string;
  counterStep: UserCounterStep[];
}

interface InitialState {
  id: string;
  counterStep: UserCounterStep[];
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    id: undefined,
    counterStep: [],
  },
  reducers: {
    initUser: (state: User, action: PayloadAction<InitialState>) => {
      state.id = action.payload.id;
      state.counterStep = action.payload.counterStep;
    },
    updateCounterStep: (state, action) => {},
  },
});

export const {updateCounterStep, initUser} = userSlice.actions;
export default userSlice.reducer;
