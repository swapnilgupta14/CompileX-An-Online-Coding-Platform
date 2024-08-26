import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: 0,
}

const SidebarSlice = createSlice({
    name: 'SIDEBAR',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            state.tab = action.payload;
        }
    }
})

export const {changeTab} = SidebarSlice.actions;
export default SidebarSlice.reducer;