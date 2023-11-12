import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // TODO: check weather this will be action.payload.userData or just action.payload
            state.userData = action.payload
        },
        logout: (state) => {
            console.log("slice called");
            state.status = false
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

