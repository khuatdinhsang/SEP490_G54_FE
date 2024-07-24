import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ClosePersonState {
    closePerson1: string,
    closePerson2: string,
    closePerson1Evaluation: string,
    closePerson2Evaluation: string,
    closePerson1Message: string,
    closePerson2Message: string
}
const initialScreenState: ClosePersonState = {
    closePerson1: "",
    closePerson2: "",
    closePerson1Evaluation: "",
    closePerson2Evaluation: "",
    closePerson1Message: "",
    closePerson2Message: ""
}
const screenSlice = createSlice({
    name: 'closePerson',
    initialState: initialScreenState,
    reducers: {
        setClosePerson1Redux(state, action: PayloadAction<string>) {
            state.closePerson1 = action.payload
        },
        setClosePerson2Redux(state, action: PayloadAction<string>) {
            state.closePerson2 = action.payload
        },
        setClosePerson1EvaluationRedux(state, action: PayloadAction<string>) {
            state.closePerson1Evaluation = action.payload
        },
        setClosePerson2EvaluationRedux(state, action: PayloadAction<string>) {
            state.closePerson2Evaluation = action.payload
        },
        setClosePerson1MessageRedux(state, action: PayloadAction<string>) {
            state.closePerson1Message = action.payload
        },
        setClosePerson2MessageRedux(state, action: PayloadAction<string>) {
            state.closePerson2Message = action.payload
        }
    }
})
export const {
    setClosePerson1Redux, setClosePerson2Redux,
    setClosePerson1EvaluationRedux, setClosePerson2EvaluationRedux,
    setClosePerson1MessageRedux,
    setClosePerson2MessageRedux
} = screenSlice.actions;

export default screenSlice.reducer;
