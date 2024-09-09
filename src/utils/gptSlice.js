import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearchView: false,
        groqApiSuggestions: null,
        tmdbSearchResults: null,
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearchView = !state.showGptSearchView;
        },
        addTmdbSearchResults: (state, action) => {
            const {groqResults, tmdbResults} = action.payload;
            state.groqApiSuggestions = groqResults;
            state.tmdbSearchResults = tmdbResults;
        } 
    }
})

export const { toggleGptSearchView, addTmdbSearchResults } = gptSlice.actions;
export default gptSlice.reducer;