import { createSlice } from "@reduxjs/toolkit"

const langSlice = createSlice({
    name: 'languages',
    initialState: {
        langSelect: 'English'
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.langSelect = action.payload;
        }
    }
})
export const { changeLanguage } = langSlice.actions;
export default langSlice.reducer;