import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ScreenState {
    currentScreen: number
}
const initialScreenState: ScreenState = {
    currentScreen: 1
}
const screenSlice = createSlice({
    name: 'screen',
    initialState: initialScreenState,
    reducers: {
        setScreen(state, action: PayloadAction<number>) {
            state.currentScreen = action.payload
        }
    }
})
export const {
    setScreen
} = screenSlice.actions;

export default screenSlice.reducer;
