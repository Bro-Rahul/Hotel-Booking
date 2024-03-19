import Header from "../components/header/header"
import Display from "../components/display/display"
import { Link , useNavigation } from "react-router-dom"
export default function SearchList(){
    const state = useNavigation()
    console.log(state.state)
    return (
        <>
            <Header/>
            <Link to={'detaile'}><button>click me</button></Link>
            <Display/>
        </>
    )
}