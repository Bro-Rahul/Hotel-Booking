import {useDispatch , useSelector} from 'react-redux'
import { setUserCradencial } from '../store/authSlice'
import Header from "../components/header/header"
import Hero from "../components/hero/hero"
import Search from "../components/search/search"
import ImageBanner from "../components/banner/imageBanner"
import Banner from "../components/banner/banner"
import Banner2 from "../components/banner/banner2"
import Footer from "../components/footer/footer"
import {useLoaderData} from 'react-router-dom'
export default function HomePage(){
  const data = useLoaderData();
  const userData = localStorage.getItem('data');
  const dispatch = useDispatch()
  const state = useSelector(state=>state.auth);
  if(userData!==undefined && userData!==null){
    const {info} = JSON.parse(userData);
    dispatch(setUserCradencial(info));
  }
  console.log(state);
  return(
      <>
          <Header/>
          <Hero/>
          <Search/>
          <Banner/>
          <ImageBanner/>
          <Banner2/>
          <Footer/>
      </>
  )
}

export const loader = async function fetchData(){
  const data = await fetch("http://127.0.0.1:8000/hotel", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const response = await data.json()
  return response;
}

/*   const [fetchData,setFetchData] = useState([]);
    const [loaded , setloaded] = useState(false);
    useEffect(()=>{
      async function fetchData(){
        const data = await fetch("http://127.0.0.1:8000/hotel")
        const response = await data.json()
        setFetchData(pre=>{
          return [...response]
        });
        setloaded(pre=>true);
      }
      fetchData()
    },[]);   */