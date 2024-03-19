import Header from "../components/header/header"
import {useSelector} from 'react-redux'
import HotelImages from "../components/hotelDetaile/hotelImage/HotelImges"
export default function ProductDetaile(){
    const state = useSelector(state=>state.auth);
    console.log(state)
    
    return(
        <>
            <Header/>   
            <HotelImages/>
        </>
    )
}