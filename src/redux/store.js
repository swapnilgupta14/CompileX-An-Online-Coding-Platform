import { configureStore} from "@reduxjs/toolkit";
import SidebarReducer from './Reducers/sidebarReducer'

const store = configureStore({
    reducer: {
        changeTab: SidebarReducer,
    },
})

export default store;