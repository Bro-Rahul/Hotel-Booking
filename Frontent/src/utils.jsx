import { setUserCradencial } from "./store/authSlice";
import { useDispatch } from 'react-redux'
export function authenticateFromLocalStore(){
    const data = JSON.parse(localStorage.getItem('data'));
    const dispatch = useDispatch();
    if(data!==null){
        const {info,error} = data
        if(!error){
            dispatch(setUserCradencial(info));
        }
    }
}