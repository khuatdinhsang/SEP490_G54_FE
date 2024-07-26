import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listRegisterMedicineData, medicinePost } from '../constant/type/medical';

interface MedicationState {
    listRegisterMedication: medicinePost[];
    listRegisterMedicationInterface: listRegisterMedicineData[] | any[];
}

const initialState: MedicationState = {
    listRegisterMedication: [],
    listRegisterMedicationInterface: [],
};

const medicationSlice = createSlice({
    name: 'medication',
    initialState,
    reducers: {
        setListRegisterMedication: (state, action: PayloadAction<medicinePost[]>) => {
            state.listRegisterMedication = action.payload;
        },
        setListRegisterMedicationInterface: (state, action: PayloadAction<listRegisterMedicineData[]>) => {
            state.listRegisterMedicationInterface = action.payload;
        },
        addRegisterMedication: (state, action: PayloadAction<medicinePost>) => {
            state.listRegisterMedication.push(action.payload);
        },
        addRegisterMedicationInterface: (state, action: PayloadAction<listRegisterMedicineData>) => {
            state.listRegisterMedicationInterface.push(action.payload);
        },
        deleteRegisterMedication: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.listRegisterMedication = state.listRegisterMedication.filter(
                (item, i) => i !== index
            );
            state.listRegisterMedicationInterface = state.listRegisterMedicationInterface.filter(
                (item, i) => i !== index
            );
        },
    },
});

export const {
    setListRegisterMedication,
    setListRegisterMedicationInterface,
    addRegisterMedication,
    addRegisterMedicationInterface,
    deleteRegisterMedication,
} = medicationSlice.actions;

export default medicationSlice.reducer;
