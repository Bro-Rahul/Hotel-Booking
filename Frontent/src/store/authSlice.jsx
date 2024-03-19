import { createSlice} from '@reduxjs/toolkit'

const authentication = createSlice({
    name : 'Athentication',
    initialState : {
        username : null,
        email : null,
        role : null,
        token : null
    },
    reducers : {
        setUserCradencial(state,action){
            state.username = action.payload.username
            state.email = action.payload.email
            state.role = action.payload.role
            state.token = action.payload.token
        }
    }
});

export const {setUserCradencial} = authentication.actions
export default authentication.reducer
